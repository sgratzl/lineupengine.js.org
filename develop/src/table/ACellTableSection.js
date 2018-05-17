import * as tslib_1 from "tslib";
import ARowRenderer from '../ARowRenderer';
import { EScrollResult } from '../mixin';
import ACellAdapter from './internal/ACellAdapter';
var ACellTableSection = (function (_super) {
    tslib_1.__extends(ACellTableSection, _super);
    function ACellTableSection(header, body, tableId, style, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, body, options) || this;
        _this.header = header;
        _this.body = body;
        _this.tableId = tableId;
        _this.style = style;
        var that = _this;
        var LocalCell = (function (_super) {
            tslib_1.__extends(LocalCell, _super);
            function LocalCell() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LocalCell.prototype, "context", {
                get: function () {
                    return that.context;
                },
                enumerable: true,
                configurable: true
            });
            LocalCell.prototype.createHeader = function (document, column) {
                return that.createHeader(document, column);
            };
            LocalCell.prototype.updateHeader = function (node, column) {
                return that.updateHeader(node, column);
            };
            LocalCell.prototype.createCell = function (document, index, column) {
                return that.createCell(document, index, column);
            };
            LocalCell.prototype.updateColumnOffset = function (firstColumnPos) {
                _super.prototype.updateColumnOffset.call(this, firstColumnPos);
                that.updateOffset(that.visibleFirstRowPos);
            };
            LocalCell.prototype.updateCell = function (node, index, column) {
                return that.updateCell(node, index, column);
            };
            LocalCell.prototype.forEachRow = function (callback) {
                return that.forEachRow(callback);
            };
            return LocalCell;
        }(ACellAdapter));
        _this.cell = new (LocalCell.bind.apply(LocalCell, [void 0, _this.header, _this.style, tableId].concat((options.mixins || []))))();
        return _this;
    }
    ACellTableSection.prototype.addColumnMixin = function (mixinClass, options) {
        this.cell.addColumnMixin(mixinClass, options);
    };
    Object.defineProperty(ACellTableSection.prototype, "width", {
        get: function () {
            return this.context.column.totalHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ACellTableSection.prototype, "height", {
        get: function () {
            return this.context.totalHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ACellTableSection.prototype, "hidden", {
        get: function () {
            return this.header.classList.contains('loading');
        },
        set: function (value) {
            var old = this.hidden;
            if (old === value) {
                return;
            }
            this.header.classList.toggle('loading', value);
            this.body.classList.toggle('loading', value);
            this.onVisibilityChanged(!value);
        },
        enumerable: true,
        configurable: true
    });
    ACellTableSection.prototype.updateSizer = function (firstRowPos) {
        this.body.style.transform = "translate(" + this.cell.leftShift().toFixed(0) + "px, " + firstRowPos.toFixed(0) + "px)";
    };
    ACellTableSection.prototype.onVisibilityChanged = function (_visible) {
    };
    ACellTableSection.prototype.hide = function () {
        this.hidden = true;
    };
    ACellTableSection.prototype.show = function (scrollLeft, clientWidth, isGoingRight) {
        var wasHidden = this.hidden;
        this.hidden = false;
        if (wasHidden) {
            this.revalidate();
        }
        else {
            this.onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight);
        }
    };
    ACellTableSection.prototype.init = function () {
        this.hide();
        this.cell.init();
        _super.prototype.init.call(this);
    };
    ACellTableSection.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.header.remove();
        this.style.remove(this.tableId);
    };
    ACellTableSection.prototype.onScrolledVertically = function (scrollTop, clientHeight, isGoingDown) {
        if (this.hidden) {
            return EScrollResult.NONE;
        }
        return _super.prototype.onScrolledVertically.call(this, scrollTop, clientHeight, isGoingDown);
    };
    ACellTableSection.prototype.onScrolledHorizontally = function (scrollLeft, clientWidth, isGoingRight) {
        return this.cell.onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight);
    };
    ACellTableSection.prototype.updateHeaders = function () {
        this.cell.updateHeaders();
    };
    ACellTableSection.prototype.updateColumnWidths = function () {
        var context = this.context;
        this.style.update(context.defaultRowHeight - context.padding(-1), context.columns, -this.cell.leftShift(), this.tableId);
    };
    ACellTableSection.prototype.recreate = function (ctx) {
        var scroller = this.bodyScroller;
        var oldLeft = scroller.scrollLeft;
        this.cell.recreate(oldLeft, scroller.clientWidth);
        _super.prototype.recreate.call(this, ctx);
        scroller.scrollLeft = oldLeft;
    };
    ACellTableSection.prototype.clearPool = function () {
        _super.prototype.clearPool.call(this);
        this.cell.clearPool();
    };
    ACellTableSection.prototype.createRow = function (node, rowIndex) {
        this.cell.createRow(node, rowIndex);
    };
    ACellTableSection.prototype.updateRow = function (node, rowIndex) {
        this.cell.updateRow(node, rowIndex);
    };
    return ACellTableSection;
}(ARowRenderer));
export { ACellTableSection };
//# sourceMappingURL=ACellTableSection.js.map