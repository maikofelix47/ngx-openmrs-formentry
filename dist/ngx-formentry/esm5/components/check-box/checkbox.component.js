/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var CheckboxControlComponent = /** @class */ (function () {
    function CheckboxControlComponent() {
        this._value = [];
        this.onChange = (/**
         * @param {?} change
         * @return {?}
         */
        function (change) { });
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @param {?} options
     * @return {?}
     */
    CheckboxControlComponent.prototype.getDisplay = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (options < 3) {
            return 'inline-block';
        }
        else {
            return 'block';
        }
    };
    /**
     * @return {?}
     */
    CheckboxControlComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    CheckboxControlComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} value
     * @return {?}
     */
    CheckboxControlComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxControlComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CheckboxControlComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    Object.defineProperty(CheckboxControlComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._value.length === 0) {
                return '';
            }
            else {
                return this._value || this._value[0];
            }
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (typeof v === 'undefined' || v === null || v === '') {
                v = [];
            }
            else if (typeof v === 'string') {
                v = [v];
            }
            else if (!Array.isArray(v)) {
                throw new TypeError('Value must be a string or an array.');
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} option
     * @param {?} event
     * @return {?}
     */
    CheckboxControlComponent.prototype.selectOpt = /**
     * @param {?} option
     * @param {?} event
     * @return {?}
     */
    function (option, event) {
        var _this = this;
        if (event.target.checked) {
            this._value.push(option.value);
        }
        else {
            this.options.forEach((/**
             * @param {?} o
             * @return {?}
             */
            function (o) {
                if (o.value === option.value) {
                    _this._value.splice(o, 1);
                }
            }));
        }
        this.onChange(this.value);
    };
    CheckboxControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'checkbox',
                    template: "\n<div *ngFor=\"let option of options; let i = index;\" [style.display]=\"getDisplay(options.length)\">\n    <label >\n        <input type=\"checkbox\"  id=\"i + 'id'\" (change)=\"selectOpt(option, $event)\" value=\"option.value\">\n        {{ option.label }} \n    </label>\n</div>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return CheckboxControlComponent; })),
                            multi: true,
                        }
                    ],
                    styles: ["\n  .no-border {\n    border: 0;\n    box-shadow: none;\n  }\n  div {\n    width: 50%;\n    margin-bottom: 5px;\n    max-width: 100%;\n}\n"]
                },] },
    ];
    CheckboxControlComponent.propDecorators = {
        options: [{ type: Input }]
    };
    return CheckboxControlComponent;
}());
export { CheckboxControlComponent };
if (false) {
    /** @type {?} */
    CheckboxControlComponent.prototype.options;
    /** @type {?} */
    CheckboxControlComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    CheckboxControlComponent.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    CheckboxControlComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jaGVjay1ib3gvY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBRXBGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUl4RTtJQUFBO1FBZ0NTLFdBQU0sR0FBZSxFQUFFLENBQUM7UUF5RHZCLGFBQVE7Ozs7UUFBRyxVQUFFLE1BQVcsSUFBTyxDQUFDLEVBQUM7UUFDakMsY0FBUzs7O1FBQUcsY0FBUSxDQUFDLEVBQUM7SUFFaEMsQ0FBQzs7Ozs7SUEzREMsNkNBQVU7Ozs7SUFBVixVQUFXLE9BQU87UUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pCLENBQUM7SUFDSCxDQUFDOzs7O0lBRU0sMkNBQVE7OztJQUFmLGNBQW1CLENBQUM7Ozs7SUFFYixrREFBZTs7O0lBQXRCLGNBQTBCLENBQUM7Ozs7O0lBRXBCLDZDQUFVOzs7O0lBQWpCLFVBQWtCLEtBQVU7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTSxtREFBZ0I7Ozs7SUFBdkIsVUFBd0IsRUFBb0I7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTSxvREFBaUI7Ozs7SUFBeEIsVUFBeUIsRUFBYztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsc0JBQUksMkNBQUs7Ozs7UUFBVDtZQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQzs7Ozs7UUFFRCxVQUFVLENBQU07WUFDZCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFXLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNYLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sSUFBSSxTQUFTLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUMvRCxDQUFDO1FBQ0gsQ0FBQzs7O09BVkE7Ozs7OztJQVlNLDRDQUFTOzs7OztJQUFoQixVQUFpQixNQUFNLEVBQUUsS0FBSztRQUE5QixpQkFZQztRQVhDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQyxDQUFDO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QixLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLENBQUM7WUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDOztnQkF2RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsNFJBTUw7b0JBQ0wsU0FBUyxFQUFFO3dCQUNUOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVOzs7NEJBQUMsY0FBTSxPQUFBLHdCQUF3QixFQUF4QixDQUF3QixFQUFDOzRCQUN2RCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFBQztvQkFDSixNQUFNLEVBQUUsQ0FBQyw0SUFVVixDQUFDO2lCQUNEOzs7MEJBSUUsS0FBSzs7SUE4RFIsK0JBQUM7Q0FBQSxBQTVGRCxJQTRGQztTQWpFWSx3QkFBd0I7OztJQUduQywyQ0FBd0I7O0lBRXhCLDBDQUErQjs7Ozs7SUF5RC9CLDRDQUF5Qzs7Ozs7SUFDekMsNkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjaGVja2JveCcsXG4gIHRlbXBsYXRlOiBgXG48ZGl2ICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGkgPSBpbmRleDtcIiBbc3R5bGUuZGlzcGxheV09XCJnZXREaXNwbGF5KG9wdGlvbnMubGVuZ3RoKVwiPlxuICAgIDxsYWJlbCA+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAgaWQ9XCJpICsgJ2lkJ1wiIChjaGFuZ2UpPVwic2VsZWN0T3B0KG9wdGlvbiwgJGV2ZW50KVwiIHZhbHVlPVwib3B0aW9uLnZhbHVlXCI+XG4gICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fSBcbiAgICA8L2xhYmVsPlxuPC9kaXY+YCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hlY2tib3hDb250cm9sQ29tcG9uZW50KSxcbiAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgfV0sXG4gIHN0eWxlczogW2BcbiAgLm5vLWJvcmRlciB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gIH1cbiAgZGl2IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG59XG5gXVxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG5cbiAgQElucHV0KCkgcHVibGljIG9wdGlvbnM7XG5cbiAgcHVibGljIF92YWx1ZTogQXJyYXk8YW55PiA9IFtdO1xuICBnZXREaXNwbGF5KG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA8IDMpIHtcbiAgICAgIHJldHVybiAnaW5saW5lLWJsb2NrJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdibG9jayc7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge31cblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge31cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlIHx8IHRoaXMuX3ZhbHVlWzBdO1xuICAgIH1cbiAgfVxuXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHYgPT09ICd1bmRlZmluZWQnIHx8IHYgPT09IG51bGwgfHwgdiA9PT0gJycpIHtcbiAgICAgICAgdiA9IFtdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHYgPSBbdl07XG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIGFycmF5LicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RPcHQob3B0aW9uLCBldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgdGhpcy5fdmFsdWUucHVzaChvcHRpb24udmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgobykgPT4ge1xuICAgICAgICBpZiAoby52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fdmFsdWUuc3BsaWNlKG8sIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZSA9ICggY2hhbmdlOiBhbnkpID0+IHsgfTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbn1cbiJdfQ==