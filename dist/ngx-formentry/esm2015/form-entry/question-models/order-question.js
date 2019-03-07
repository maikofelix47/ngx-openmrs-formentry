/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
import { QuestionBase } from './question-base';
export class OrderQuestion extends QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'select';
        this.orderType = options.orderType;
        this.selectableOrders = options.selectableOrders;
        this.options = options.options;
        this.orderSettingUuid = options.orderSettingUuid;
        this.rendering = options.orderSettingUuid;
        this.controlType = AfeControlType.AfeFormControl;
    }
}
if (false) {
    /** @type {?} */
    OrderQuestion.prototype.orderType;
    /** @type {?} */
    OrderQuestion.prototype.selectableOrders;
    /** @type {?} */
    OrderQuestion.prototype.orderSettingUuid;
    /** @type {?} */
    OrderQuestion.prototype.rendering;
    /** @type {?} */
    OrderQuestion.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcXVlc3Rpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9vcmRlci1xdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxNQUFNLG9CQUFxQixTQUFRLFlBQVk7Ozs7SUFNM0MsWUFBWSxPQUE2QjtRQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFDckQsQ0FBQztDQUNKOzs7SUFmRyxrQ0FBa0I7O0lBQ2xCLHlDQUF1RDs7SUFDdkQseUNBQXlCOztJQUN6QixrQ0FBa0I7O0lBQ2xCLGdDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5pbXBvcnQgeyBPcmRlclF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9vcmRlci1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4vcXVlc3Rpb24tYmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBPcmRlclF1ZXN0aW9uIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcbiAgICBvcmRlclR5cGU6IHN0cmluZztcbiAgICBzZWxlY3RhYmxlT3JkZXJzOiB7IGNvbmNlcHQ6IHN0cmluZywgbGFiZWw6IHN0cmluZyB9W107XG4gICAgb3JkZXJTZXR0aW5nVXVpZDogc3RyaW5nO1xuICAgIHJlbmRlcmluZzogc3RyaW5nO1xuICAgIG9wdGlvbnM6IGFueVtdO1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9yZGVyUXVlc3Rpb25PcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAnc2VsZWN0JztcbiAgICAgICAgdGhpcy5vcmRlclR5cGUgPSBvcHRpb25zLm9yZGVyVHlwZTtcbiAgICAgICAgdGhpcy5zZWxlY3RhYmxlT3JkZXJzID0gb3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnM7XG4gICAgICAgIHRoaXMub3JkZXJTZXR0aW5nVXVpZCA9IG9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSBvcHRpb25zLm9yZGVyU2V0dGluZ1V1aWQ7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgICB9XG59XG4iXX0=