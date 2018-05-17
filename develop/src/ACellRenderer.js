import * as tslib_1 from "tslib";
import { ARowRenderer } from './ARowRenderer';
import { GridStyleManager, setTemplate } from './style';
import ACellAdapter from './table/internal/ACellAdapter';
import { addScroll } from './internal';
var ACellRenderer = (function (_super) {
    tslib_1.__extends(ACellRenderer, _super);
    function ACellRenderer(root, htmlId, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, setTemplate(root).querySelector('main > article'), options) || this;
        _this.root = root;
        root.classList.add('lineup-engine');
        _this.style = new GridStyleManager(_this.root, htmlId);
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
            LocalCell.prototype.updateCell = function (node, index, column) {
                return that.updateCell(node, index, column);
            };
            LocalCell.prototype.updateColumnOffset = function (firstColumnPos) {
                _super.prototype.updateColumnOffset.call(this, firstColumnPos);
                that.updateOffset(that.visibleFirstRowPos);
            };
            LocalCell.prototype.forEachRow = function (callback) {
                return that.forEachRow(callback);
            };
            return LocalCell;
        }(ACellAdapter));
        _this.cell = new (LocalCell.bind.apply(LocalCell, [void 0, _this.header, _this.style, undefined].concat((options.mixins || []))))();
        return _this;
    }
    Object.defineProperty(ACellRenderer.prototype, "header", {
        get: function () {
            return this.root.querySelector('header > article');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ACellRenderer.prototype, "headerScroller", {
        get: function () {
            return this.root.querySelector('header');
        },
        enumerable: true,
        configurable: true
    });
    ACellRenderer.prototype.addColumnMixin = function (mixinClass, options) {
        this.cell.addColumnMixin(mixinClass, options);
    };
    ACellRenderer.prototype.init = function () {
        var _this = this;
        this.cell.init();
        var scroller = this.body.parentElement;
        var old = addScroll(scroller, this.options.async, function (act) {
            if (Math.abs(old.left - act.left) < _this.options.minScrollDelta && Math.abs(old.width - act.width) < _this.options.minScrollDelta) {
                return;
            }
            var isGoingRight = act.left > old.left;
            old = act;
            _this.onScrolledHorizontally(act.left, act.width, isGoingRight);
        });
        _super.prototype.init.call(this);
    };
    ACellRenderer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.root.remove();
    };
    ACellRenderer.prototype.onScrolledHorizontally = function (scrollLeft, clientWidth, isGoingRight) {
        return this.cell.onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight);
    };
    ACellRenderer.prototype.updateHeaders = function () {
        this.cell.updateHeaders();
    };
    ACellRenderer.prototype.updateColumnWidths = function () {
        var context = this.context;
        this.style.update(context.defaultRowHeight - context.padding(-1), context.columns, -this.cell.leftShift());
    };
    ACellRenderer.prototype.updateSizer = function (firstRowPos) {
        var ctx = this.context;
        var totalHeight = ctx.totalHeight;
        var totalWidth = ctx.column.totalHeight;
        this.body.style.transform = "translate(" + this.cell.leftShift().toFixed(0) + "px, " + firstRowPos.toFixed(0) + "px)";
        this.bodySizer.style.transform = "translate(" + Math.max(0, totalWidth - 1).toFixed(0) + "px, " + Math.max(0, totalHeight - 1).toFixed(0) + "px)";
    };
    ACellRenderer.prototype.recreate = function (ctx) {
        var scroller = this.bodyScroller;
        var oldLeft = scroller.scrollLeft;
        this.cell.recreate(oldLeft, scroller.clientWidth);
        _super.prototype.recreate.call(this, ctx);
        scroller.scrollLeft = oldLeft;
    };
    ACellRenderer.prototype.clearPool = function () {
        _super.prototype.clearPool.call(this);
        this.cell.clearPool();
    };
    ACellRenderer.prototype.createRow = function (node, rowIndex) {
        this.cell.createRow(node, rowIndex);
    };
    ACellRenderer.prototype.updateRow = function (node, rowIndex) {
        this.cell.updateRow(node, rowIndex);
    };
    return ACellRenderer;
}(ARowRenderer));
export { ACellRenderer };
export default ACellRenderer;
//# sourceMappingURL=ACellRenderer.js.map