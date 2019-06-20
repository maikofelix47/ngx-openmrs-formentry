/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Inject } from '@angular/core';
import 'hammerjs';
import { DEFAULT_STYLES } from './form-renderer.component.css';
import { DOCUMENT } from '@angular/common';
import { DataSources } from '../data-sources/data-sources';
import { NodeBase, GroupNode } from '../form-factory/form-node';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { ValidationFactory } from '../form-factory/validation.factory';
import { FormErrorsService } from '../services/form-errors.service';
// import { concat, of, Observable, Subject, BehaviorSubject } from 'rxjs';
// import * as _ from 'lodash';
// import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
// import { QuestionBase } from '../question-models';
var FormRendererComponent = /** @class */ (function () {
    // items$: Observable<any[]>;
    // itemsLoading = false;
    // itemsInput$ = new Subject<string>();
    function FormRendererComponent(validationFactory, dataSources, formErrorsService, document) {
        this.validationFactory = validationFactory;
        this.dataSources = dataSources;
        this.formErrorsService = formErrorsService;
        this.document = document;
        this.childComponents = [];
        this.isCollapsed = false;
        this.activeTab = 0;
    }
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setUpRemoteSelect();
        this.setUpFileUpload();
        if (this.node && this.node.form) {
            /** @type {?} */
            var tab = this.node.form.valueProcessingInfo.lastFormTab;
            if (tab && tab !== this.activeTab) {
                this.activeTab = tab;
            }
        }
        if (this.node && this.node.question.renderingType === 'form') {
            this.formErrorsService.announceErrorField$.subscribe((/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                _this.scrollToControl(error);
            }));
        }
        if (this.node && this.node.question.renderingType === 'section') {
            this.isCollapsed = !((/** @type {?} */ (this.node.question))).isExpanded;
        }
        if (this.parentComponent) {
            this.parentComponent.addChildComponent(this);
        }
    };
    /**
     * @param {?} child
     * @return {?}
     */
    FormRendererComponent.prototype.addChildComponent = /**
     * @param {?} child
     * @return {?}
     */
    function (child) {
        this.childComponents.push(child);
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setUpRemoteSelect = /**
     * @return {?}
     */
    function () {
        if (this.node && this.node.question.extras &&
            this.node.question.renderingType === 'remote-select') {
            // let selectQuestion = this.node.form.searchNodeByQuestionId(this.node.question.key)[0];
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            /*
             let defaltValues = of([]);
             if (this.dataSource.resolveSelectedValue(selectQuestion.control.value)) {
               defaltValues = this.dataSource.resolveSelectedValue(selectQuestion.control.value).pipe(
                 catchError(() => of([])), // empty list on error
               );
             }
             this.items$ = concat(
               defaltValues,
               this.itemsInput$.pipe(
                 debounceTime(200),
                 distinctUntilChanged(),
                 tap(() => this.itemsLoading = true),
                 switchMap(term => this.dataSource.searchOptions(term).pipe(
                   catchError(() => of([])), // empty list on error
                   tap(() => {
                     this.itemsLoading = false
                   })
                 ))
               )
             );
             */
            if (this.dataSource && this.node.question.dataSourceOptions) {
                this.dataSource.dataSourceOptions = this.node.question.dataSourceOptions;
            }
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setUpFileUpload = /**
     * @return {?}
     */
    function () {
        if (this.node && this.node.question.extras && this.node.question.renderingType === 'file') {
            this.dataSource = this.dataSources.dataSources[this.node.question.dataSource];
            // console.log('Key', this.node.question);
            // console.log('Data source', this.dataSource);
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.checkSection = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.question.renderingType === 'section') {
            /** @type {?} */
            var groupChildrenHidden_1 = false;
            /** @type {?} */
            var allSectionControlsHidden = Object.keys(node.children).every((/**
             * @param {?} k
             * @return {?}
             */
            function (k) {
                /** @type {?} */
                var innerNode = node.children[k];
                if (innerNode instanceof GroupNode) {
                    groupChildrenHidden_1 = Object.keys(innerNode.children).every((/**
                     * @param {?} i
                     * @return {?}
                     */
                    function (i) { return innerNode.children[i].control.hidden; }));
                }
                return node.children[k].control.hidden || groupChildrenHidden_1;
            }));
            return !allSectionControlsHidden;
        }
        return true;
    };
    /**
     * @param {?} tabNumber
     * @return {?}
     */
    FormRendererComponent.prototype.clickTab = /**
     * @param {?} tabNumber
     * @return {?}
     */
    function (tabNumber) {
        this.activeTab = tabNumber;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.loadPreviousTab = /**
     * @return {?}
     */
    function () {
        if (!this.isCurrentTabFirst()) {
            this.clickTab(this.activeTab - 1);
            document.body.scrollTop = 0;
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.isCurrentTabFirst = /**
     * @return {?}
     */
    function () {
        return this.activeTab === 0;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.isCurrentTabLast = /**
     * @return {?}
     */
    function () {
        return this.activeTab === this.node.question['questions'].length - 1;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.loadNextTab = /**
     * @return {?}
     */
    function () {
        if (!this.isCurrentTabLast()) {
            this.clickTab(this.activeTab + 1);
            document.body.scrollTop = 0;
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    FormRendererComponent.prototype.tabSelected = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.activeTab = $event;
        this.setPreviousTab();
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.setPreviousTab = /**
     * @return {?}
     */
    function () {
        if (this.node && this.node.form) {
            this.node.form.valueProcessingInfo['lastFormTab'] = this.activeTab;
        }
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.hasErrors = /**
     * @return {?}
     */
    function () {
        return this.node.control.touched && !this.node.control.valid;
    };
    /**
     * @return {?}
     */
    FormRendererComponent.prototype.errors = /**
     * @return {?}
     */
    function () {
        return this.getErrors(this.node);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    FormRendererComponent.prototype.scrollToControl = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        var _this = this;
        /** @type {?} */
        var tab = +error.split(',')[0];
        /** @type {?} */
        var elSelector = error.split(',')[1] + 'id';
        // the tab components
        /** @type {?} */
        var tabComponent = this.childComponents[tab];
        this.clickTab(tab);
        setTimeout((/**
         * @return {?}
         */
        function () {
            // expand all sections
            tabComponent.childComponents.forEach((/**
             * @param {?} section
             * @return {?}
             */
            function (section) {
                section.isCollapsed = false;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var element = _this.document.getElementById(elSelector);
                    if (element !== null && element.focus) {
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }), 100);
            }));
        }), 200);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.onDateChanged = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        // console.log('Node', node);
        this.node = node;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FormRendererComponent.prototype.upload = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log('Event', event);
        // console.log('Data', this.dataSource);
    };
    /**
     * @param {?} infoId
     * @return {?}
     */
    FormRendererComponent.prototype.toggleInformation = /**
     * @param {?} infoId
     * @return {?}
     */
    function (infoId) {
        /** @type {?} */
        var e = document.getElementById(infoId);
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
        else {
            e.style.display = 'block';
        }
        console.log('InfoId', infoId);
    };
    /**
     * @private
     * @param {?} node
     * @return {?}
     */
    FormRendererComponent.prototype.getErrors = /**
     * @private
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var errors = node.control.errors;
        if (errors) {
            return this.validationFactory.errors(errors, node.question);
        }
        return [];
    };
    FormRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'form-renderer',
                    template: "<!--CONTAINERS-->\n<div *ngIf=\"node.question.renderingType === 'form'\">\n  <div class=\"dropdown dropdown-tabs forms-dropdown\">\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"fa fa-angle-double-down\"></i>\n    </a>\n    <ul class=\"dropdown-menu dropdown-menu-right forms-dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n      <li *ngFor=\"let question of node.question.questions; let i = index;\" (click)=\"clickTab(i)\">\n        {{question.label}}\n      </li>\n    </ul>\n  </div>\n  <mat-tab-group (selectedIndexChange)='tabSelected($event)' [selectedIndex]='activeTab'>\n    <mat-tab [label]='question.label' *ngFor=\"let question of node.question.questions; let i = index;\">\n      <div (swipeLeft)='loadNextTab()' (swipeRight)='loadPreviousTab()'>\n        <form-renderer [node]=\"node.children[question.key]\" [parentComponent]=\"this\" [parentGroup]=\"node.control\"></form-renderer>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <div style=\"text-align: center;\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadPreviousTab()\" [ngClass]=\"{disabled: isCurrentTabFirst()}\">&lt;&lt;</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"loadNextTab()\" [ngClass]=\"{disabled: isCurrentTabLast()}\">\n      &gt;&gt;</button>\n  </div>\n</div>\n<div *ngIf=\"node.question.renderingType === 'page'\">\n  <!--<h2>{{node.question.label}}</h2>-->\n  <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n    [parentGroup]=\"parentGroup\"></form-renderer>\n</div>\n<div *ngIf=\"node.question.renderingType === 'section' && checkSection(node)\"> \n  <div class=\"panel  panel-primary\">\n    <div class=\"panel-heading\">\n      <button type=\"button\" class=\"btn btn-primary pull-right\" (click)=\"isCollapsed = !isCollapsed\">\n        {{isCollapsed ? 'Show' : 'Hide'}}\n      </button> {{node.question.label}}\n    </div>\n    <div class=\"panel-body\" [collapse]=\"isCollapsed\">\n      <form-renderer *ngFor=\"let question of node.question.questions\" [parentComponent]=\"this\" [node]=\"node.children[question.key]\"\n        [parentGroup]=\"parentGroup\"></form-renderer>\n    </div>\n  </div>\n</div>\n\n<!-- MESSAGES -->\n<div *ngIf=\"node.control && node.control.alert && node.control.alert !== ''\" class=\"alert alert-warning\">\n  <a class=\"close\" data-dismiss=\"alert\">&times;</a> {{node.control.alert}}\n</div>\n\n<!--CONTROLS-->\n\n<div *ngIf=\"node.question.controlType === 0\" class=\"form-group\" [formGroup]=\"parentGroup\" [hidden]=\"node.control.hidden\"\n  [ngClass]=\"{disabled: node.control.disabled}\">\n  <!--LEAF CONTROL-->\n  <div class=\"question-area\">\n    <a class=\"form-tooltip pull-right\" (click)=\"toggleInformation(node.question.extras.id)\" data-placement=\"right\"\n      *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      <i class=\"glyphicon glyphicon-question-sign\" aria-hidden=\"true\"></i>\n    </a>\n\n    <label *ngIf=\"node.question.label\" [style.color]=\"hasErrors()? 'red' :''\" class=\"control-label\" [attr.for]=\"node.question.key\">\n      {{node.question.required ? '*':''}} {{node.question.label}}\n    </label>\n    <div [ngSwitch]=\"node.question.renderingType\">\n      <select class=\"form-control\" *ngSwitchCase=\"'select'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n        <option *ngFor=\"let o of node.question.options\" [ngValue]=\"o.value\">{{o.label}}\n        </option>\n      </select>\n\n      <remote-file-upload *ngSwitchCase=\"'file'\" [dataSource]=\"dataSource\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n        (fileChanged)=\"upload($event)\">\n      </remote-file-upload>\n      <textarea [placeholder]=\"node.question.placeholder\" [rows]=\"node.question.rows\" class=\"form-control\"\n        *ngSwitchCase=\"'textarea'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </textarea>\n      <!--\n      <ng-select *ngSwitchCase=\"'remote-select'\" [items]=\"items$ | async\" bindLabel=\"label\" bindValue=\"value\" placeholder=\"{{node.question.placeholder}}\"\n        [hideSelected]=\"true\" [loading]=\"itemsLoading\"  [typeahead]=\"itemsInput$\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\">\n      </ng-select>\n    -->\n      <remote-select *ngSwitchCase=\"'remote-select'\" [placeholder]=\"node.question.placeholder\" tabindex=\"0\"\n        [dataSource]=\"dataSource\" [componentID]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"></remote-select>\n      <!--  \n      <date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" tabindex=\"0\" [weeks]='node.question.extras.questionOptions.weeksList'\n        (onDateChange)=\"onDateChanged(node)\" [showWeeks]=\"node.question.showWeeksAdder\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\"></date-time-picker>\n  -->\n\n      <ngx-date-time-picker *ngSwitchCase=\"'date'\" [showTime]=\"node.question.showTime\" [id]=\"node.question.key + 'id'\"\n        [formControlName]=\"node.question.key\" [weeks]='node.question.extras.questionOptions.weeksList' (onDateChange)=\"onDateChanged(node)\"\n        [showWeeks]=\"node.question.showWeeksAdder\"></ngx-date-time-picker>\n      <ng-select *ngSwitchCase=\"'multi-select'\" [style.height]=\"'auto'\"  [style.overflow-x]=\"'hidden'\" tabindex=\"0\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\"\n          [options]=\"node.question.options\" [multiple]=\"true\">\n      </ng-select>\n      <ng-select *ngSwitchCase=\"'single-select'\" [style.height]='auto'  tabindex=\"0\" [formControlName]=\"node.question.key\"\n        [id]=\"node.question.key + 'id'\" [options]=\"node.question.options\" [multiple]=\"false\">\n      </ng-select>\n      <input class=\"form-control\" *ngSwitchCase=\"'number'\" [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"'number'\" [id]=\"node.question.key + 'id' \" [step]=\"'any'\" [min]=\"node.question.extras.questionOptions.min\"\n        [max]=\"node.question.extras.questionOptions.max\">\n      <input class=\"form-control\" *ngSwitchDefault [formControlName]=\"node.question.key \" [attr.placeholder]=\"node.question.placeholder \"\n        [type]=\"node.question.renderingType\" [id]=\"node.question.key + 'id' \">\n\n      <div *ngSwitchCase=\"'radio'\">\n        <div *ngFor=\"let o of node.question.options\">\n          <label class=\"form-control no-border\">\n            <input type=\"radio\" [formControlName]=\"node.question.key\" [id]=\"node.question.key + 'id'\" [value]=\"o.value\">\n            {{ o.label }}\n          </label>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"'checkbox'\">\n        <checkbox  [id]=\"node.question.key + 'id'\" [formControlName]=\"node.question.key\" [options]=\"node.question.options\"></checkbox>\n      </div>\n\n      <div *ngIf=\"node.question.enableHistoricalValue && node.question.historicalDisplay\" style=\"margin-top: 2px;\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-xs-9\">\n              <span class=\"text-warning\">Previous Value: </span>\n              <strong>{{node.question.historicalDisplay?.text}}</strong>\n              <span *ngIf=\"node.question.showHistoricalValueDate\">\n                <span> | </span>\n                <strong class=\"text-primary\">{{node.question.historicalDisplay?._date}} </strong>\n                <span class=\"text-primary\" *ngIf=\"node.question.historicalDisplay && node.question.historicalDisplay._date \"> ({{node.question.historicalDisplay._date | timeAgo}})</span>\n              </span>\n\n            </div>\n            <button type=\"button\" [node]=\"node\" [name]=\"'historyValue'\" class=\"btn btn-primary btn-small col-xs-3\">Use\n              Value\n            </button>\n          </div>\n        </div>\n      </div>\n      <appointments-overview [node]=\"node\"></appointments-overview>\n      <div *ngIf=\"hasErrors() \">\n        <p *ngFor=\"let e of errors() \">\n          <span class=\"text-danger \">{{e}}</span>\n        </p>\n      </div>\n    </div>\n\n    <div class=\"question-info col-md-12 col-lg-12 col-sm-12\" id=\"{{node.question.extras.id}}\" *ngIf=\"node.question && node.question.extras.questionInfo  && node.question.extras.questionInfo !== ''  && node.question.extras.questionInfo !== ' '\">\n      {{node.question.extras.questionInfo}}\n    </div>\n\n  </div>\n</div>\n<div *ngIf=\"node.question.controlType === 1\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n\n  <!--ARRAY CONTROL-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div class='well' style=\"padding: 2px; \" *ngSwitchCase=\" 'repeating' \">\n      <h4 style=\"margin: 2px; font-weight: bold;\">{{node.question.label}}</h4>\n      <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:2px;\" />\n      <div [ngSwitch]=\"node.question.extras.type\">\n        <div *ngSwitchCase=\"'testOrder'\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <div>{{child.orderNumber}}</div>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n\n        <div *ngSwitchCase=\"'obsGroup'\" style=\"margin-bottom:20px;\">\n          <div *ngFor=\"let child of node.children; let i=index \">\n            <form-renderer *ngFor=\"let question of child.question.questions \" [parentComponent]=\"this\" [node]=\"child.children[question.key]\n            \"\n              [parentGroup]=\"child.control \"></form-renderer>\n            <button type=\"button \" class='btn btn-sm btn-danger' (click)=\"node.removeAt(i) \">Remove</button>\n            <br />\n            <hr style=\"margin-left:-2px; margin-right:-2px; margin-bottom:4px; margin-top:8px; border-width:1px;\" />\n          </div>\n        </div>\n      </div>\n      <button type=\"button \" class='btn btn-primary' (click)=\"node.createChildNode() \">Add</button>\n    </div>\n  </div>\n\n</div>\n<div *ngIf=\"node.question.controlType === 2\" [hidden]=\"node.control.hidden\" [ngClass]=\"{disabled: node.control.disabled}\">\n\n  <!--GROUP-->\n  <div [ngSwitch]=\"node.question.renderingType \">\n    <div *ngSwitchCase=\" 'group' \">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n    <div *ngSwitchCase=\" 'field-set' \" style=\"border: 1px solid #eeeeee; padding: 2px; margin: 2px;\">\n      <form-renderer *ngFor=\"let question of node.question.questions \" [parentComponent]=\"this\" [node]=\"node.children[question.key]\n            \"\n        [parentGroup]=\"node.control \"></form-renderer>\n    </div>\n  </div>\n\n</div>",
                    styles: ['../../style/app.css', DEFAULT_STYLES]
                },] },
    ];
    FormRendererComponent.ctorParameters = function () { return [
        { type: ValidationFactory },
        { type: DataSources },
        { type: FormErrorsService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    FormRendererComponent.propDecorators = {
        parentComponent: [{ type: Input }],
        node: [{ type: Input }],
        parentGroup: [{ type: Input }]
    };
    return FormRendererComponent;
}());
export { FormRendererComponent };
if (false) {
    /** @type {?} */
    FormRendererComponent.prototype.parentComponent;
    /** @type {?} */
    FormRendererComponent.prototype.node;
    /** @type {?} */
    FormRendererComponent.prototype.parentGroup;
    /** @type {?} */
    FormRendererComponent.prototype.childComponents;
    /** @type {?} */
    FormRendererComponent.prototype.showTime;
    /** @type {?} */
    FormRendererComponent.prototype.showWeeks;
    /** @type {?} */
    FormRendererComponent.prototype.activeTab;
    /** @type {?} */
    FormRendererComponent.prototype.dataSource;
    /** @type {?} */
    FormRendererComponent.prototype.isCollapsed;
    /** @type {?} */
    FormRendererComponent.prototype.auto;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.validationFactory;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.dataSources;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.formErrorsService;
    /**
     * @type {?}
     * @private
     */
    FormRendererComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tcmVuZGVyZXIvZm9ybS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFDakMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBWSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7O0FBUXBFO0lBK05FLDZCQUE2QjtJQUM3Qix3QkFBd0I7SUFDeEIsdUNBQXVDO0lBRXZDLCtCQUNVLGlCQUFvQyxFQUNwQyxXQUF3QixFQUN4QixpQkFBb0MsRUFDbEIsUUFBYTtRQUgvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQWpCbEMsb0JBQWUsR0FBNEIsRUFBRSxDQUFDO1FBSzlDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBYXpCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3JC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QUUsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUM7aUJBQ2hEOzs7Z0JBek5RLGlCQUFpQjtnQkFIakIsV0FBVztnQkFLWCxpQkFBaUI7Z0RBK09yQixNQUFNLFNBQUMsUUFBUTs7O2tDQXBCakIsS0FBSzt1QkFDTCxLQUFLOzhCQUNMLEtBQUs7O0lBd05SLDRCQUFDO0NBQUEsQUE3YUQsSUE2YUM7U0E3TlkscUJBQXFCOzs7SUFHaEMsZ0RBQXVEOztJQUN2RCxxQ0FBK0I7O0lBQy9CLDRDQUEwQzs7SUFDMUMsZ0RBQXFEOztJQUNyRCx5Q0FBeUI7O0lBQ3pCLDBDQUEwQjs7SUFDMUIsMENBQXlCOztJQUN6QiwyQ0FBOEI7O0lBQzlCLDRDQUEyQjs7SUFDM0IscUNBQWlCOzs7OztJQVFmLGtEQUE0Qzs7Ozs7SUFDNUMsNENBQWdDOzs7OztJQUNoQyxrREFBNEM7Ozs7O0lBQzVDLHlDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSW5qZWN0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ2hhbW1lcmpzJztcbmltcG9ydCB7IERFRkFVTFRfU1RZTEVTIH0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyLmNvbXBvbmVudC5jc3MnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGF0YVNvdXJjZXMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZXMvZGF0YS1zb3VyY2VzJztcbmltcG9ydCB7IE5vZGVCYXNlLCBMZWFmTm9kZSwgR3JvdXBOb2RlIH0gZnJvbSAnLi4vZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgeyBBZmVGb3JtR3JvdXAgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkZhY3RvcnkgfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5JztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBGb3JtRXJyb3JzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tZXJyb3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG4vLyBpbXBvcnQgeyBjb25jYXQsIG9mLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbi8vIGltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuLy8gaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgdGFwLCBzd2l0Y2hNYXAsIGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbi8vIGltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm0tcmVuZGVyZXInLFxuICB0ZW1wbGF0ZTogYDwhLS1DT05UQUlORVJTLS0+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZm9ybSdcIj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duIGRyb3Bkb3duLXRhYnMgZm9ybXMtZHJvcGRvd25cIj5cbiAgICA8YSBjbGFzcz1cImJ0biBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLWRvdWJsZS1kb3duXCI+PC9pPlxuICAgIDwvYT5cbiAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHQgZm9ybXMtZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwiZHJvcGRvd25NZW51XCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJjbGlja1RhYihpKVwiPlxuICAgICAgICB7e3F1ZXN0aW9uLmxhYmVsfX1cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG4gIDxtYXQtdGFiLWdyb3VwIChzZWxlY3RlZEluZGV4Q2hhbmdlKT0ndGFiU2VsZWN0ZWQoJGV2ZW50KScgW3NlbGVjdGVkSW5kZXhdPSdhY3RpdmVUYWInPlxuICAgIDxtYXQtdGFiIFtsYWJlbF09J3F1ZXN0aW9uLmxhYmVsJyAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnM7IGxldCBpID0gaW5kZXg7XCI+XG4gICAgICA8ZGl2IChzd2lwZUxlZnQpPSdsb2FkTmV4dFRhYigpJyAoc3dpcGVSaWdodCk9J2xvYWRQcmV2aW91c1RhYigpJz5cbiAgICAgICAgPGZvcm0tcmVuZGVyZXIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWF0LXRhYj5cbiAgPC9tYXQtdGFiLWdyb3VwPlxuXG4gIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiAoY2xpY2spPVwibG9hZFByZXZpb3VzVGFiKClcIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGlzQ3VycmVudFRhYkZpcnN0KCl9XCI+Jmx0OyZsdDs8L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIChjbGljayk9XCJsb2FkTmV4dFRhYigpXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBpc0N1cnJlbnRUYWJMYXN0KCl9XCI+XG4gICAgICAmZ3Q7Jmd0OzwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnXCI+XG4gIDwhLS08aDI+e3tub2RlLnF1ZXN0aW9uLmxhYmVsfX08L2gyPi0tPlxuICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnNcIiBbcGFyZW50Q29tcG9uZW50XT1cInRoaXNcIiBbbm9kZV09XCJub2RlLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cIlxuICAgIFtwYXJlbnRHcm91cF09XCJwYXJlbnRHcm91cFwiPjwvZm9ybS1yZW5kZXJlcj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nICYmIGNoZWNrU2VjdGlvbihub2RlKVwiPiBcbiAgPGRpdiBjbGFzcz1cInBhbmVsICBwYW5lbC1wcmltYXJ5XCI+XG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiAoY2xpY2spPVwiaXNDb2xsYXBzZWQgPSAhaXNDb2xsYXBzZWRcIj5cbiAgICAgICAge3tpc0NvbGxhcHNlZCA/ICdTaG93JyA6ICdIaWRlJ319XG4gICAgICA8L2J1dHRvbj4ge3tub2RlLnF1ZXN0aW9uLmxhYmVsfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiIFtjb2xsYXBzZV09XCJpc0NvbGxhcHNlZFwiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cInBhcmVudEdyb3VwXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIE1FU1NBR0VTIC0tPlxuPGRpdiAqbmdJZj1cIm5vZGUuY29udHJvbCAmJiBub2RlLmNvbnRyb2wuYWxlcnQgJiYgbm9kZS5jb250cm9sLmFsZXJ0ICE9PSAnJ1wiIGNsYXNzPVwiYWxlcnQgYWxlcnQtd2FybmluZ1wiPlxuICA8YSBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIj4mdGltZXM7PC9hPiB7e25vZGUuY29udHJvbC5hbGVydH19XG48L2Rpdj5cblxuPCEtLUNPTlRST0xTLS0+XG5cbjxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmNvbnRyb2xUeXBlID09PSAwXCIgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW2Zvcm1Hcm91cF09XCJwYXJlbnRHcm91cFwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiXG4gIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuICA8IS0tTEVBRiBDT05UUk9MLS0+XG4gIDxkaXYgY2xhc3M9XCJxdWVzdGlvbi1hcmVhXCI+XG4gICAgPGEgY2xhc3M9XCJmb3JtLXRvb2x0aXAgcHVsbC1yaWdodFwiIChjbGljayk9XCJ0b2dnbGVJbmZvcm1hdGlvbihub2RlLnF1ZXN0aW9uLmV4dHJhcy5pZClcIiBkYXRhLXBsYWNlbWVudD1cInJpZ2h0XCJcbiAgICAgICpuZ0lmPVwibm9kZS5xdWVzdGlvbiAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJycgICYmIG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uSW5mbyAhPT0gJyAnXCI+XG4gICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcXVlc3Rpb24tc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L2E+XG5cbiAgICA8bGFiZWwgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmxhYmVsXCIgW3N0eWxlLmNvbG9yXT1cImhhc0Vycm9ycygpPyAncmVkJyA6JydcIiBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIiBbYXR0ci5mb3JdPVwibm9kZS5xdWVzdGlvbi5rZXlcIj5cbiAgICAgIHt7bm9kZS5xdWVzdGlvbi5yZXF1aXJlZCA/ICcqJzonJ319IHt7bm9kZS5xdWVzdGlvbi5sYWJlbH19XG4gICAgPC9sYWJlbD5cbiAgICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIj5cbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIG5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFtuZ1ZhbHVlXT1cIm8udmFsdWVcIj57e28ubGFiZWx9fVxuICAgICAgICA8L29wdGlvbj5cbiAgICAgIDwvc2VsZWN0PlxuXG4gICAgICA8cmVtb3RlLWZpbGUtdXBsb2FkICpuZ1N3aXRjaENhc2U9XCInZmlsZSdcIiBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgICAoZmlsZUNoYW5nZWQpPVwidXBsb2FkKCRldmVudClcIj5cbiAgICAgIDwvcmVtb3RlLWZpbGUtdXBsb2FkPlxuICAgICAgPHRleHRhcmVhIFtwbGFjZWhvbGRlcl09XCJub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyXCIgW3Jvd3NdPVwibm9kZS5xdWVzdGlvbi5yb3dzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+XG4gICAgICA8L3RleHRhcmVhPlxuICAgICAgPCEtLVxuICAgICAgPG5nLXNlbGVjdCAqbmdTd2l0Y2hDYXNlPVwiJ3JlbW90ZS1zZWxlY3QnXCIgW2l0ZW1zXT1cIml0ZW1zJCB8IGFzeW5jXCIgYmluZExhYmVsPVwibGFiZWxcIiBiaW5kVmFsdWU9XCJ2YWx1ZVwiIHBsYWNlaG9sZGVyPVwie3tub2RlLnF1ZXN0aW9uLnBsYWNlaG9sZGVyfX1cIlxuICAgICAgICBbaGlkZVNlbGVjdGVkXT1cInRydWVcIiBbbG9hZGluZ109XCJpdGVtc0xvYWRpbmdcIiAgW3R5cGVhaGVhZF09XCJpdGVtc0lucHV0JFwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+XG4gICAgICA8L25nLXNlbGVjdD5cbiAgICAtLT5cbiAgICAgIDxyZW1vdGUtc2VsZWN0ICpuZ1N3aXRjaENhc2U9XCIncmVtb3RlLXNlbGVjdCdcIiBbcGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlclwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIiBbY29tcG9uZW50SURdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW2Zvcm1Db250cm9sTmFtZV09XCJub2RlLnF1ZXN0aW9uLmtleVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIj48L3JlbW90ZS1zZWxlY3Q+XG4gICAgICA8IS0tICBcbiAgICAgIDxkYXRlLXRpbWUtcGlja2VyICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBbc2hvd1RpbWVdPVwibm9kZS5xdWVzdGlvbi5zaG93VGltZVwiIHRhYmluZGV4PVwiMFwiIFt3ZWVrc109J25vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy53ZWVrc0xpc3QnXG4gICAgICAgIChvbkRhdGVDaGFuZ2UpPVwib25EYXRlQ2hhbmdlZChub2RlKVwiIFtzaG93V2Vla3NdPVwibm9kZS5xdWVzdGlvbi5zaG93V2Vla3NBZGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIlxuICAgICAgICBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCI+PC9kYXRlLXRpbWUtcGlja2VyPlxuICAtLT5cblxuICAgICAgPG5neC1kYXRlLXRpbWUtcGlja2VyICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIiBbc2hvd1RpbWVdPVwibm9kZS5xdWVzdGlvbi5zaG93VGltZVwiIFtpZF09XCJub2RlLnF1ZXN0aW9uLmtleSArICdpZCdcIlxuICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW3dlZWtzXT0nbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLndlZWtzTGlzdCcgKG9uRGF0ZUNoYW5nZSk9XCJvbkRhdGVDaGFuZ2VkKG5vZGUpXCJcbiAgICAgICAgW3Nob3dXZWVrc109XCJub2RlLnF1ZXN0aW9uLnNob3dXZWVrc0FkZGVyXCI+PC9uZ3gtZGF0ZS10aW1lLXBpY2tlcj5cbiAgICAgIDxuZy1zZWxlY3QgKm5nU3dpdGNoQ2FzZT1cIidtdWx0aS1zZWxlY3QnXCIgW3N0eWxlLmhlaWdodF09XCInYXV0bydcIiAgW3N0eWxlLm92ZXJmbG93LXhdPVwiJ2hpZGRlbidcIiB0YWJpbmRleD1cIjBcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCIgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiXG4gICAgICAgICAgW29wdGlvbnNdPVwibm9kZS5xdWVzdGlvbi5vcHRpb25zXCIgW211bHRpcGxlXT1cInRydWVcIj5cbiAgICAgIDwvbmctc2VsZWN0PlxuICAgICAgPG5nLXNlbGVjdCAqbmdTd2l0Y2hDYXNlPVwiJ3NpbmdsZS1zZWxlY3QnXCIgW3N0eWxlLmhlaWdodF09J2F1dG8nICB0YWJpbmRleD1cIjBcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5XCJcbiAgICAgICAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtvcHRpb25zXT1cIm5vZGUucXVlc3Rpb24ub3B0aW9uc1wiIFttdWx0aXBsZV09XCJmYWxzZVwiPlxuICAgICAgPC9uZy1zZWxlY3Q+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIiBbZm9ybUNvbnRyb2xOYW1lXT1cIm5vZGUucXVlc3Rpb24ua2V5IFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cIm5vZGUucXVlc3Rpb24ucGxhY2Vob2xkZXIgXCJcbiAgICAgICAgW3R5cGVdPVwiJ251bWJlcidcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnIFwiIFtzdGVwXT1cIidhbnknXCIgW21pbl09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMubWluXCJcbiAgICAgICAgW21heF09XCJub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMubWF4XCI+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAqbmdTd2l0Y2hEZWZhdWx0IFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXkgXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwibm9kZS5xdWVzdGlvbi5wbGFjZWhvbGRlciBcIlxuICAgICAgICBbdHlwZV09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGVcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnIFwiPlxuXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncmFkaW8nXCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG8gb2Ygbm9kZS5xdWVzdGlvbi5vcHRpb25zXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jb250cm9sIG5vLWJvcmRlclwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbaWRdPVwibm9kZS5xdWVzdGlvbi5rZXkgKyAnaWQnXCIgW3ZhbHVlXT1cIm8udmFsdWVcIj5cbiAgICAgICAgICAgIHt7IG8ubGFiZWwgfX1cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInY2hlY2tib3gnXCI+XG4gICAgICAgIDxjaGVja2JveCAgW2lkXT1cIm5vZGUucXVlc3Rpb24ua2V5ICsgJ2lkJ1wiIFtmb3JtQ29udHJvbE5hbWVdPVwibm9kZS5xdWVzdGlvbi5rZXlcIiBbb3B0aW9uc109XCJub2RlLnF1ZXN0aW9uLm9wdGlvbnNcIj48L2NoZWNrYm94PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmVuYWJsZUhpc3RvcmljYWxWYWx1ZSAmJiBub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAycHg7XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTlcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdhcm5pbmdcIj5QcmV2aW91cyBWYWx1ZTogPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nPnt7bm9kZS5xdWVzdGlvbi5oaXN0b3JpY2FsRGlzcGxheT8udGV4dH19PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5zaG93SGlzdG9yaWNhbFZhbHVlRGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiB8IDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzPVwidGV4dC1wcmltYXJ5XCI+e3tub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5Py5fZGF0ZX19IDwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1wcmltYXJ5XCIgKm5nSWY9XCJub2RlLnF1ZXN0aW9uLmhpc3RvcmljYWxEaXNwbGF5ICYmIG5vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXkuX2RhdGUgXCI+ICh7e25vZGUucXVlc3Rpb24uaGlzdG9yaWNhbERpc3BsYXkuX2RhdGUgfCB0aW1lQWdvfX0pPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW25vZGVdPVwibm9kZVwiIFtuYW1lXT1cIidoaXN0b3J5VmFsdWUnXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtYWxsIGNvbC14cy0zXCI+VXNlXG4gICAgICAgICAgICAgIFZhbHVlXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxhcHBvaW50bWVudHMtb3ZlcnZpZXcgW25vZGVdPVwibm9kZVwiPjwvYXBwb2ludG1lbnRzLW92ZXJ2aWV3PlxuICAgICAgPGRpdiAqbmdJZj1cImhhc0Vycm9ycygpIFwiPlxuICAgICAgICA8cCAqbmdGb3I9XCJsZXQgZSBvZiBlcnJvcnMoKSBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyIFwiPnt7ZX19PC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJxdWVzdGlvbi1pbmZvIGNvbC1tZC0xMiBjb2wtbGctMTIgY29sLXNtLTEyXCIgaWQ9XCJ7e25vZGUucXVlc3Rpb24uZXh0cmFzLmlkfX1cIiAqbmdJZj1cIm5vZGUucXVlc3Rpb24gJiYgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25JbmZvICAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gIT09ICcnICAmJiBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm8gIT09ICcgJ1wiPlxuICAgICAge3tub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbkluZm99fVxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMVwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuXG5cbiAgPCEtLUFSUkFZIENPTlRST0wtLT5cbiAgPGRpdiBbbmdTd2l0Y2hdPVwibm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlIFwiPlxuICAgIDxkaXYgY2xhc3M9J3dlbGwnIHN0eWxlPVwicGFkZGluZzogMnB4OyBcIiAqbmdTd2l0Y2hDYXNlPVwiICdyZXBlYXRpbmcnIFwiPlxuICAgICAgPGg0IHN0eWxlPVwibWFyZ2luOiAycHg7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPnt7bm9kZS5xdWVzdGlvbi5sYWJlbH19PC9oND5cbiAgICAgIDxociBzdHlsZT1cIm1hcmdpbi1sZWZ0Oi0ycHg7IG1hcmdpbi1yaWdodDotMnB4OyBtYXJnaW4tYm90dG9tOjRweDsgbWFyZ2luLXRvcDo4cHg7IGJvcmRlci13aWR0aDoycHg7XCIgLz5cbiAgICAgIDxkaXYgW25nU3dpdGNoXT1cIm5vZGUucXVlc3Rpb24uZXh0cmFzLnR5cGVcIj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3Rlc3RPcmRlcidcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuOyBsZXQgaT1pbmRleCBcIj5cbiAgICAgICAgICAgIDxmb3JtLXJlbmRlcmVyICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBjaGlsZC5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwiY2hpbGQuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgW3BhcmVudEdyb3VwXT1cImNoaWxkLmNvbnRyb2wgXCI+PC9mb3JtLXJlbmRlcmVyPlxuICAgICAgICAgICAgPGRpdj57e2NoaWxkLm9yZGVyTnVtYmVyfX08L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvbiBcIiBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGFuZ2VyJyAoY2xpY2spPVwibm9kZS5yZW1vdmVBdChpKSBcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjFweDtcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInb2JzR3JvdXAnXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOjIwcHg7XCI+XG4gICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGk9aW5kZXggXCI+XG4gICAgICAgICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2YgY2hpbGQucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cImNoaWxkLmNoaWxkcmVuW3F1ZXN0aW9uLmtleV1cbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIFtwYXJlbnRHcm91cF09XCJjaGlsZC5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvbiBcIiBjbGFzcz0nYnRuIGJ0bi1zbSBidG4tZGFuZ2VyJyAoY2xpY2spPVwibm9kZS5yZW1vdmVBdChpKSBcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgPGhyIHN0eWxlPVwibWFyZ2luLWxlZnQ6LTJweDsgbWFyZ2luLXJpZ2h0Oi0ycHg7IG1hcmdpbi1ib3R0b206NHB4OyBtYXJnaW4tdG9wOjhweDsgYm9yZGVyLXdpZHRoOjFweDtcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uIFwiIGNsYXNzPSdidG4gYnRuLXByaW1hcnknIChjbGljayk9XCJub2RlLmNyZWF0ZUNoaWxkTm9kZSgpIFwiPkFkZDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwibm9kZS5xdWVzdGlvbi5jb250cm9sVHlwZSA9PT0gMlwiIFtoaWRkZW5dPVwibm9kZS5jb250cm9sLmhpZGRlblwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogbm9kZS5jb250cm9sLmRpc2FibGVkfVwiPlxuXG4gIDwhLS1HUk9VUC0tPlxuICA8ZGl2IFtuZ1N3aXRjaF09XCJub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgXCI+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiICdncm91cCcgXCI+XG4gICAgICA8Zm9ybS1yZW5kZXJlciAqbmdGb3I9XCJsZXQgcXVlc3Rpb24gb2Ygbm9kZS5xdWVzdGlvbi5xdWVzdGlvbnMgXCIgW3BhcmVudENvbXBvbmVudF09XCJ0aGlzXCIgW25vZGVdPVwibm9kZS5jaGlsZHJlbltxdWVzdGlvbi5rZXldXG4gICAgICAgICAgICBcIlxuICAgICAgICBbcGFyZW50R3JvdXBdPVwibm9kZS5jb250cm9sIFwiPjwvZm9ybS1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIgJ2ZpZWxkLXNldCcgXCIgc3R5bGU9XCJib3JkZXI6IDFweCBzb2xpZCAjZWVlZWVlOyBwYWRkaW5nOiAycHg7IG1hcmdpbjogMnB4O1wiPlxuICAgICAgPGZvcm0tcmVuZGVyZXIgKm5nRm9yPVwibGV0IHF1ZXN0aW9uIG9mIG5vZGUucXVlc3Rpb24ucXVlc3Rpb25zIFwiIFtwYXJlbnRDb21wb25lbnRdPVwidGhpc1wiIFtub2RlXT1cIm5vZGUuY2hpbGRyZW5bcXVlc3Rpb24ua2V5XVxuICAgICAgICAgICAgXCJcbiAgICAgICAgW3BhcmVudEdyb3VwXT1cIm5vZGUuY29udHJvbCBcIj48L2Zvcm0tcmVuZGVyZXI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2Rpdj5gLFxuICBzdHlsZXM6IFsnLi4vLi4vc3R5bGUvYXBwLmNzcycsIERFRkFVTFRfU1RZTEVTXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgQElucHV0KCkgcHVibGljIHBhcmVudENvbXBvbmVudDogRm9ybVJlbmRlcmVyQ29tcG9uZW50O1xuICBASW5wdXQoKSBwdWJsaWMgbm9kZTogTm9kZUJhc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXJlbnRHcm91cDogQWZlRm9ybUdyb3VwO1xuICBwdWJsaWMgY2hpbGRDb21wb25lbnRzOiBGb3JtUmVuZGVyZXJDb21wb25lbnRbXSA9IFtdO1xuICBwdWJsaWMgc2hvd1RpbWU6IGJvb2xlYW47XG4gIHB1YmxpYyBzaG93V2Vla3M6IGJvb2xlYW47XG4gIHB1YmxpYyBhY3RpdmVUYWI6IG51bWJlcjtcbiAgcHVibGljIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XG4gIHB1YmxpYyBpc0NvbGxhcHNlZCA9IGZhbHNlO1xuICBwdWJsaWMgYXV0bzogYW55O1xuICBcblxuICAvLyBpdGVtcyQ6IE9ic2VydmFibGU8YW55W10+O1xuICAvLyBpdGVtc0xvYWRpbmcgPSBmYWxzZTtcbiAgLy8gaXRlbXNJbnB1dCQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9uRmFjdG9yeTogVmFsaWRhdGlvbkZhY3RvcnksXG4gICAgcHJpdmF0ZSBkYXRhU291cmNlczogRGF0YVNvdXJjZXMsXG4gICAgcHJpdmF0ZSBmb3JtRXJyb3JzU2VydmljZTogRm9ybUVycm9yc1NlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAwO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0VXBSZW1vdGVTZWxlY3QoKTtcbiAgICB0aGlzLnNldFVwRmlsZVVwbG9hZCgpO1xuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmZvcm0pIHtcbiAgICAgIGNvbnN0IHRhYiA9IHRoaXMubm9kZS5mb3JtLnZhbHVlUHJvY2Vzc2luZ0luZm8ubGFzdEZvcm1UYWI7XG4gICAgICBpZiAodGFiICYmIHRhYiAhPT0gdGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmb3JtJykge1xuICAgICAgdGhpcy5mb3JtRXJyb3JzU2VydmljZS5hbm5vdW5jZUVycm9yRmllbGQkLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0NvbnRyb2woZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSAhKHRoaXMubm9kZS5xdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwKS5pc0V4cGFuZGVkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhcmVudENvbXBvbmVudCkge1xuICAgICAgdGhpcy5wYXJlbnRDb21wb25lbnQuYWRkQ2hpbGRDb21wb25lbnQodGhpcyk7XG4gICAgfVxuICB9XG5cblxuXG4gIHB1YmxpYyBhZGRDaGlsZENvbXBvbmVudChjaGlsZDogRm9ybVJlbmRlcmVyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMucHVzaChjaGlsZCk7XG4gIH1cblxuICBwdWJsaWMgc2V0VXBSZW1vdGVTZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucXVlc3Rpb24uZXh0cmFzICYmXG4gICAgICB0aGlzLm5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3JlbW90ZS1zZWxlY3QnKSB7XG4gICAgICAvLyBsZXQgc2VsZWN0UXVlc3Rpb24gPSB0aGlzLm5vZGUuZm9ybS5zZWFyY2hOb2RlQnlRdWVzdGlvbklkKHRoaXMubm9kZS5xdWVzdGlvbi5rZXkpWzBdO1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgIC8qXG4gICAgICBsZXQgZGVmYWx0VmFsdWVzID0gb2YoW10pO1xuICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZS5yZXNvbHZlU2VsZWN0ZWRWYWx1ZShzZWxlY3RRdWVzdGlvbi5jb250cm9sLnZhbHVlKSkge1xuICAgICAgICBkZWZhbHRWYWx1ZXMgPSB0aGlzLmRhdGFTb3VyY2UucmVzb2x2ZVNlbGVjdGVkVmFsdWUoc2VsZWN0UXVlc3Rpb24uY29udHJvbC52YWx1ZSkucGlwZShcbiAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKFtdKSksIC8vIGVtcHR5IGxpc3Qgb24gZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXRlbXMkID0gY29uY2F0KFxuICAgICAgICBkZWZhbHRWYWx1ZXMsXG4gICAgICAgIHRoaXMuaXRlbXNJbnB1dCQucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLml0ZW1zTG9hZGluZyA9IHRydWUpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0ZXJtID0+IHRoaXMuZGF0YVNvdXJjZS5zZWFyY2hPcHRpb25zKHRlcm0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9mKFtdKSksIC8vIGVtcHR5IGxpc3Qgb24gZXJyb3JcbiAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgICovXG4gICAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5kYXRhU291cmNlT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YVNvdXJjZU9wdGlvbnMgPSB0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFVwRmlsZVVwbG9hZCgpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5xdWVzdGlvbi5leHRyYXMgJiYgdGhpcy5ub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdmaWxlJykge1xuICAgICAgdGhpcy5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlcy5kYXRhU291cmNlc1t0aGlzLm5vZGUucXVlc3Rpb24uZGF0YVNvdXJjZV07XG4gICAgICAvLyBjb25zb2xlLmxvZygnS2V5JywgdGhpcy5ub2RlLnF1ZXN0aW9uKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhIHNvdXJjZScsIHRoaXMuZGF0YVNvdXJjZSk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1NlY3Rpb24obm9kZTogTm9kZUJhc2UpIHtcbiAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIGxldCBncm91cENoaWxkcmVuSGlkZGVuID0gZmFsc2U7XG4gICAgICBsZXQgYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuID0gT2JqZWN0LmtleXMobm9kZS5jaGlsZHJlbikuZXZlcnkoKGspID0+IHtcbiAgICAgICAgbGV0IGlubmVyTm9kZSA9IG5vZGUuY2hpbGRyZW5ba107XG4gICAgICAgIGlmIChpbm5lck5vZGUgaW5zdGFuY2VvZiBHcm91cE5vZGUpIHtcbiAgICAgICAgICBncm91cENoaWxkcmVuSGlkZGVuID0gT2JqZWN0LmtleXMoaW5uZXJOb2RlLmNoaWxkcmVuKS5ldmVyeSgoaSkgPT4gaW5uZXJOb2RlLmNoaWxkcmVuW2ldLmNvbnRyb2wuaGlkZGVuKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmNoaWxkcmVuW2tdLmNvbnRyb2wuaGlkZGVuIHx8IGdyb3VwQ2hpbGRyZW5IaWRkZW47XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAhYWxsU2VjdGlvbkNvbnRyb2xzSGlkZGVuO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbGlja1RhYih0YWJOdW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYk51bWJlcjtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUHJldmlvdXNUYWIoKSB7XG4gICAgaWYgKCF0aGlzLmlzQ3VycmVudFRhYkZpcnN0KCkpIHtcbiAgICAgIHRoaXMuY2xpY2tUYWIodGhpcy5hY3RpdmVUYWIgLSAxKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNDdXJyZW50VGFiRmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSAwO1xuICB9XG5cbiAgcHVibGljIGlzQ3VycmVudFRhYkxhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVGFiID09PSB0aGlzLm5vZGUucXVlc3Rpb25bJ3F1ZXN0aW9ucyddLmxlbmd0aCAtIDE7XG4gIH1cblxuICBwdWJsaWMgbG9hZE5leHRUYWIoKSB7XG4gICAgaWYgKCF0aGlzLmlzQ3VycmVudFRhYkxhc3QoKSkge1xuICAgICAgdGhpcy5jbGlja1RhYih0aGlzLmFjdGl2ZVRhYiArIDEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgdGFiU2VsZWN0ZWQoJGV2ZW50KSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAkZXZlbnQ7XG4gICAgdGhpcy5zZXRQcmV2aW91c1RhYigpO1xuICB9XG4gIHB1YmxpYyBzZXRQcmV2aW91c1RhYigpIHtcbiAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5mb3JtKSB7XG4gICAgICB0aGlzLm5vZGUuZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvWydsYXN0Rm9ybVRhYiddID0gdGhpcy5hY3RpdmVUYWI7XG4gICAgfVxuXG4gIH1cbiAgcHVibGljIGhhc0Vycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmNvbnRyb2wudG91Y2hlZCAmJiAhdGhpcy5ub2RlLmNvbnRyb2wudmFsaWQ7XG4gIH1cblxuICBwdWJsaWMgZXJyb3JzKCkge1xuICAgIHJldHVybiB0aGlzLmdldEVycm9ycyh0aGlzLm5vZGUpO1xuICB9XG5cblxuICBwdWJsaWMgc2Nyb2xsVG9Db250cm9sKGVycm9yOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IHRhYjogbnVtYmVyID0gK2Vycm9yLnNwbGl0KCcsJylbMF07XG4gICAgY29uc3QgZWxTZWxlY3RvciA9IGVycm9yLnNwbGl0KCcsJylbMV0gKyAnaWQnO1xuXG4gICAgLy8gdGhlIHRhYiBjb21wb25lbnRzXG4gICAgY29uc3QgdGFiQ29tcG9uZW50OiBGb3JtUmVuZGVyZXJDb21wb25lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50c1t0YWJdO1xuXG4gICAgdGhpcy5jbGlja1RhYih0YWIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGV4cGFuZCBhbGwgc2VjdGlvbnNcbiAgICAgIHRhYkNvbXBvbmVudC5jaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICBzZWN0aW9uLmlzQ29sbGFwc2VkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZWxlbWVudDogYW55ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbFNlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgICAgfSk7XG5cbiAgICB9LCAyMDApO1xuICB9XG5cbiAgcHVibGljIG9uRGF0ZUNoYW5nZWQobm9kZTogTGVhZk5vZGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnTm9kZScsIG5vZGUpO1xuICAgIHRoaXMubm9kZSA9IG5vZGU7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ0V2ZW50JywgZXZlbnQpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdEYXRhJywgdGhpcy5kYXRhU291cmNlKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVJbmZvcm1hdGlvbihpbmZvSWQpIHtcbiAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5mb0lkKTtcblxuICAgIGlmIChlLnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpIHtcbiAgICAgIGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cblxuICAgIGNvbnNvbGUubG9nKCdJbmZvSWQnLCBpbmZvSWQpO1xuICB9XG5cblxuICBwcml2YXRlIGdldEVycm9ycyhub2RlOiBOb2RlQmFzZSkge1xuICAgIGNvbnN0IGVycm9yczogYW55ID0gbm9kZS5jb250cm9sLmVycm9ycztcblxuICAgIGlmIChlcnJvcnMpIHtcblxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZXJyb3JzKGVycm9ycywgbm9kZS5xdWVzdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXX0=