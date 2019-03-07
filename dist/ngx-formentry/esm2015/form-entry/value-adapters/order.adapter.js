/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
export class OrderValueAdapter {
    constructor() {
        this.formOrderNodes = [];
        this.provider = '';
    }
    /**
     * @param {?} form
     * @return {?}
     */
    generateFormPayload(form) {
        this.formOrderNodes = [];
        this._setOrderProvider(form);
        this._findTestOrderQuestionNodes(form.rootNode);
        return this._createOrdersPayload(this.formOrderNodes, form);
    }
    /**
     * @param {?} form
     * @param {?} payload
     * @return {?}
     */
    populateForm(form, payload) {
        form.existingOrders = payload;
        this.formOrderNodes = [];
        this._findTestOrderQuestionNodes(form.rootNode);
        /** @type {?} */
        const existingOrders = this._getExistingOrders(form);
        this._setOrderValues(this.formOrderNodes, existingOrders);
    }
    /**
     * @private
     * @param {?} form
     * @return {?}
     */
    _setOrderProvider(form) {
        if (form.valueProcessingInfo.providerUuid) {
            this.provider = form.valueProcessingInfo.providerUuid;
        }
    }
    /**
     * @private
     * @param {?} orderNodes
     * @param {?} form
     * @return {?}
     */
    _createOrdersPayload(orderNodes, form) {
        /** @type {?} */
        const payload = [];
        /** @type {?} */
        const selectedOrders = [];
        /** @type {?} */
        let deletedOrders = [];
        /** @type {?} */
        const existingOrders = this._getExistingOrders(form);
        for (const orderNode of orderNodes) {
            /** @type {?} */
            const orderNodeValues = orderNode.control.value;
            /** @type {?} */
            const orders = [];
            if (existingOrders) {
                existingOrders.map((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) {
                    orders[obj.concept] = obj.concept;
                }));
            }
            for (const order in orderNodeValues) {
                if (orderNodeValues.hasOwnProperty(order)) {
                    /** @type {?} */
                    const orderValue = orderNodeValues[order][orderNode.question.key];
                    /** @type {?} */
                    const payloadOrder = this._createPayloadOrder(orderValue, orderNode.question.extras);
                    if (orders[orderValue] !== orderValue && payloadOrder.concept !== '') {
                        payload.push(payloadOrder);
                    }
                    selectedOrders[orderValue] = orderValue;
                    if (payloadOrder.orderNumber === '') {
                        delete payloadOrder.orderNumber;
                    }
                    if (payloadOrder.uuid === '') {
                        delete payloadOrder.uuid;
                    }
                }
            }
        }
        deletedOrders = this._getDeletedOrders(selectedOrders, existingOrders);
        return this._addDeletedOrdersToPayload(deletedOrders, payload);
    }
    /**
     * @private
     * @param {?} form
     * @return {?}
     */
    _getExistingOrders(form) {
        if (form.existingOrders && form.existingOrders.orders) {
            /** @type {?} */
            let existingOrders = form.existingOrders.orders.map((/**
             * @param {?} o
             * @return {?}
             */
            (o) => {
                return {
                    concept: o.concept.uuid,
                    orderNumber: o.orderNumber,
                    orderUuid: o.uuid,
                    voided: o.voided,
                    dateVoided: o.auditInfo.dateVoided
                };
            }));
            return existingOrders = _.filter(existingOrders, (/**
             * @param {?} order
             * @return {?}
             */
            (order) => {
                if (order.voided === true || order.dateVoided) {
                    return false;
                }
                else {
                    return true;
                }
            }));
        }
        else {
            return;
        }
    }
    /**
     * @private
     * @param {?} node
     * @param {?} existingOrders
     * @return {?}
     */
    _setOrderValues(node, existingOrders) {
        this._findTestOrderQuestionNodes(node);
        /** @type {?} */
        const orderNodes = this.formOrderNodes;
        for (const orderNode of orderNodes) {
            this._setOrderNodeValues(orderNode, existingOrders);
        }
    }
    /**
     * @private
     * @param {?} deletedOrders
     * @param {?} payload
     * @return {?}
     */
    _addDeletedOrdersToPayload(deletedOrders, payload) {
        for (const order in deletedOrders) {
            if (deletedOrders.hasOwnProperty(order)) {
                payload.push({ uuid: deletedOrders[order], voided: true });
            }
        }
        return payload;
    }
    /**
     * @private
     * @param {?} orderConcept
     * @param {?} quesitonExtras
     * @return {?}
     */
    _createPayloadOrder(orderConcept, quesitonExtras) {
        /** @type {?} */
        const order = {
            concept: '',
            type: '',
            orderer: '',
            careSetting: '',
            dateActivated: ''
        };
        order.concept = orderConcept;
        order.type = quesitonExtras.questionOptions.orderType;
        order.orderer = this.provider;
        order.careSetting = quesitonExtras.questionOptions.orderSettingUuid;
        // delete orderer if provider not provided
        if (order.orderer === '') {
            delete order.orderer;
        }
        // if (quesitonExtras.questionOptions.orderType === 'Order') {
        //   order.dateActivated = quesitonExtras.questionOptions.orderDate;
        // }
        return order;
    }
    /**
     * @private
     * @param {?} selectedOrders
     * @param {?} existingOrders
     * @return {?}
     */
    _getDeletedOrders(selectedOrders, existingOrders) {
        /** @type {?} */
        const deleteOrders = [];
        if (selectedOrders) {
            for (const order in existingOrders) {
                if (existingOrders.hasOwnProperty(order)) {
                    /** @type {?} */
                    const existingOrderConcept = existingOrders[order].concept;
                    /** @type {?} */
                    const selectedOrder = selectedOrders[existingOrderConcept];
                    if (selectedOrder !== existingOrderConcept) {
                        deleteOrders.push(existingOrders[order].orderUuid);
                    }
                }
            }
        }
        // console.log('Deleted Orders ', deleteOrders);
        return deleteOrders;
    }
    /**
     * @private
     * @param {?} node
     * @param {?} orders
     * @return {?}
     */
    _setOrderNodeValues(node, orders) {
        /** @type {?} */
        let index = 0;
        node['initialValue'] = orders;
        for (const order of orders) {
            node.createChildNode();
            /** @type {?} */
            const value = {};
            value[node.question.key] = order.concept;
            /** @type {?} */
            const childNode = node.children[index];
            childNode.control.setValue(value);
            childNode['initialValue'] = value;
            childNode['orderNumber'] = order.orderNumber;
            // console.log('Set Value', node.children[index].control.value, node, childNode);
            index++;
        }
    }
    /**
     * @private
     * @param {?} formNode
     * @return {?}
     */
    _findTestOrderQuestionNodes(formNode) {
        if (formNode.children) {
            if (formNode.children instanceof Object) {
                for (const key in formNode.children) {
                    if (formNode.children.hasOwnProperty(key)) {
                        switch (formNode.children[key].question.renderingType) {
                            case 'page':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'section':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'group':
                                this._findTestOrderQuestionNodes(formNode.children[key]);
                                break;
                            case 'repeating':
                                if (formNode.children) {
                                    // tslint:disable-next-line:forin
                                    for (const node in formNode.children) {
                                        /** @type {?} */
                                        const question = formNode.children[node].question;
                                        if (question.extras && question.extras.type === 'testOrder') {
                                            this.formOrderNodes.push(formNode.children[node]);
                                        }
                                        else if (question.extras && question.extras.type === 'Order') {
                                            this.formOrderNodes.push(formNode.children[node]);
                                        }
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
}
OrderValueAdapter.decorators = [
    { type: Injectable },
];
if (false) {
    /** @type {?} */
    OrderValueAdapter.prototype.formOrderNodes;
    /**
     * @type {?}
     * @private
     */
    OrderValueAdapter.prototype.provider;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvdmFsdWUtYWRhcHRlcnMvb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNO0lBRE47UUFFSSxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFrTjFCLENBQUM7Ozs7O0lBaE5HLG1CQUFtQixDQUFDLElBQVU7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxJQUFVLEVBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztjQUMxQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsSUFBVTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENB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QUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7NENBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3Q0FDdEQsQ0FBQztvQ0FDTCxDQUFDO2dDQUVMLENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWO2dDQUNJLEtBQUssQ0FBQzt3QkFFZCxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFFTCxDQUFDO0lBQ0wsQ0FBQzs7O1lBak5KLFVBQVU7Ozs7SUFFUCwyQ0FBb0I7Ozs7O0lBQ3BCLHFDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9mb3JtLWZhY3RvcnkvZm9ybSc7XG5pbXBvcnQgeyBWYWx1ZUFkYXB0ZXIgfSBmcm9tICcuL3ZhbHVlLmFkYXB0ZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZGVyVmFsdWVBZGFwdGVyIGltcGxlbWVudHMgVmFsdWVBZGFwdGVyIHtcbiAgICBmb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgIHByaXZhdGUgcHJvdmlkZXIgPSAnJztcblxuICAgIGdlbmVyYXRlRm9ybVBheWxvYWQoZm9ybTogRm9ybSkge1xuICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzID0gW107XG4gICAgICAgIHRoaXMuX3NldE9yZGVyUHJvdmlkZXIoZm9ybSk7XG4gICAgICAgIHRoaXMuX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm0ucm9vdE5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3JkZXJzUGF5bG9hZCh0aGlzLmZvcm1PcmRlck5vZGVzLCBmb3JtKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZUZvcm0oZm9ybTogRm9ybSwgcGF5bG9hZCkge1xuICAgICAgICBmb3JtLmV4aXN0aW5nT3JkZXJzID0gcGF5bG9hZDtcbiAgICAgICAgdGhpcy5mb3JtT3JkZXJOb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtLnJvb3ROb2RlKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlcnMgPSB0aGlzLl9nZXRFeGlzdGluZ09yZGVycyhmb3JtKTtcbiAgICAgICAgdGhpcy5fc2V0T3JkZXJWYWx1ZXModGhpcy5mb3JtT3JkZXJOb2RlcywgZXhpc3RpbmdPcmRlcnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE9yZGVyUHJvdmlkZXIoZm9ybTogRm9ybSkge1xuICAgICAgICBpZiAoZm9ybS52YWx1ZVByb2Nlc3NpbmdJbmZvLnByb3ZpZGVyVXVpZCkge1xuICAgICAgICAgICAgdGhpcy5wcm92aWRlciA9IGZvcm0udmFsdWVQcm9jZXNzaW5nSW5mby5wcm92aWRlclV1aWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVPcmRlcnNQYXlsb2FkKG9yZGVyTm9kZXMsIGZvcm06IEZvcm0pIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9yZGVycyA9IFtdO1xuICAgICAgICBsZXQgZGVsZXRlZE9yZGVycyA9IFtdO1xuICAgICAgICBjb25zdCBleGlzdGluZ09yZGVycyA9IHRoaXMuX2dldEV4aXN0aW5nT3JkZXJzKGZvcm0pO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyTm9kZSBvZiBvcmRlck5vZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBvcmRlck5vZGVWYWx1ZXMgPSBvcmRlck5vZGUuY29udHJvbC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycyA9IFtdO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nT3JkZXJzKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdPcmRlcnMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJzW29iai5jb25jZXB0XSA9IG9iai5jb25jZXB0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gb3JkZXJOb2RlVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyTm9kZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmRlclZhbHVlID0gb3JkZXJOb2RlVmFsdWVzW29yZGVyXVtvcmRlck5vZGUucXVlc3Rpb24ua2V5XTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkT3JkZXIgPSB0aGlzLl9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJWYWx1ZSwgb3JkZXJOb2RlLnF1ZXN0aW9uLmV4dHJhcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyc1tvcmRlclZhbHVlXSAhPT0gb3JkZXJWYWx1ZSAmJiBwYXlsb2FkT3JkZXIuY29uY2VwdCAhPT0gJycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHBheWxvYWRPcmRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcmRlcnNbb3JkZXJWYWx1ZV0gPSBvcmRlclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLm9yZGVyTnVtYmVyID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBheWxvYWRPcmRlci5vcmRlck51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZE9yZGVyLnV1aWQgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGF5bG9hZE9yZGVyLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZWRPcmRlcnMgPSB0aGlzLl9nZXREZWxldGVkT3JkZXJzKHNlbGVjdGVkT3JkZXJzLCBleGlzdGluZ09yZGVycyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGREZWxldGVkT3JkZXJzVG9QYXlsb2FkKGRlbGV0ZWRPcmRlcnMsIHBheWxvYWQpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RXhpc3RpbmdPcmRlcnMoZm9ybTogRm9ybSkge1xuICAgICAgICBpZiAoZm9ybS5leGlzdGluZ09yZGVycyAmJiBmb3JtLmV4aXN0aW5nT3JkZXJzLm9yZGVycykge1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nT3JkZXJzID0gZm9ybS5leGlzdGluZ09yZGVycy5vcmRlcnMubWFwKChvKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29uY2VwdDogby5jb25jZXB0LnV1aWQsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyTnVtYmVyOiBvLm9yZGVyTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBvcmRlclV1aWQ6IG8udXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdm9pZGVkOiBvLnZvaWRlZCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVZvaWRlZDogby5hdWRpdEluZm8uZGF0ZVZvaWRlZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nT3JkZXJzID0gXy5maWx0ZXIoZXhpc3RpbmdPcmRlcnMsIChvcmRlcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyLnZvaWRlZCA9PT0gdHJ1ZSB8fCBvcmRlci5kYXRlVm9pZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0T3JkZXJWYWx1ZXMobm9kZSwgZXhpc3RpbmdPcmRlcnMpIHtcbiAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMobm9kZSk7XG5cbiAgICAgICAgY29uc3Qgb3JkZXJOb2RlcyA9IHRoaXMuZm9ybU9yZGVyTm9kZXM7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXJOb2RlIG9mIG9yZGVyTm9kZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldE9yZGVyTm9kZVZhbHVlcyhvcmRlck5vZGUsIGV4aXN0aW5nT3JkZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZERlbGV0ZWRPcmRlcnNUb1BheWxvYWQoZGVsZXRlZE9yZGVycywgcGF5bG9hZCk6IGFueSB7XG4gICAgICAgIGZvciAoY29uc3Qgb3JkZXIgaW4gZGVsZXRlZE9yZGVycykge1xuICAgICAgICAgICAgaWYgKGRlbGV0ZWRPcmRlcnMuaGFzT3duUHJvcGVydHkob3JkZXIpKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5wdXNoKHsgdXVpZDogZGVsZXRlZE9yZGVyc1tvcmRlcl0sIHZvaWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVQYXlsb2FkT3JkZXIob3JkZXJDb25jZXB0LCBxdWVzaXRvbkV4dHJhcyk6IGFueSB7XG4gICAgICAgIGNvbnN0IG9yZGVyID0ge1xuICAgICAgICAgICAgY29uY2VwdDogJycsXG4gICAgICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgICAgIG9yZGVyZXI6ICcnLFxuICAgICAgICAgICAgY2FyZVNldHRpbmc6ICcnLFxuICAgICAgICAgICAgZGF0ZUFjdGl2YXRlZCA6ICcnXG4gICAgICAgIH07XG4gICAgICAgIG9yZGVyLmNvbmNlcHQgPSBvcmRlckNvbmNlcHQ7XG4gICAgICAgIG9yZGVyLnR5cGUgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJUeXBlO1xuICAgICAgICBvcmRlci5vcmRlcmVyID0gdGhpcy5wcm92aWRlcjtcbiAgICAgICAgb3JkZXIuY2FyZVNldHRpbmcgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcblxuICAgICAgICAvLyBkZWxldGUgb3JkZXJlciBpZiBwcm92aWRlciBub3QgcHJvdmlkZWRcbiAgICAgICAgaWYgKG9yZGVyLm9yZGVyZXIgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgb3JkZXIub3JkZXJlcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAocXVlc2l0b25FeHRyYXMucXVlc3Rpb25PcHRpb25zLm9yZGVyVHlwZSA9PT0gJ09yZGVyJykge1xuICAgICAgICAvLyAgIG9yZGVyLmRhdGVBY3RpdmF0ZWQgPSBxdWVzaXRvbkV4dHJhcy5xdWVzdGlvbk9wdGlvbnMub3JkZXJEYXRlO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldERlbGV0ZWRPcmRlcnMoc2VsZWN0ZWRPcmRlcnMsIGV4aXN0aW5nT3JkZXJzKTogYW55IHtcbiAgICAgICAgY29uc3QgZGVsZXRlT3JkZXJzID0gW107XG4gICAgICAgIGlmIChzZWxlY3RlZE9yZGVycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcmRlciBpbiBleGlzdGluZ09yZGVycykge1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ09yZGVycy5oYXNPd25Qcm9wZXJ0eShvcmRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlckNvbmNlcHQgPSBleGlzdGluZ09yZGVyc1tvcmRlcl0uY29uY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcmRlciA9IHNlbGVjdGVkT3JkZXJzW2V4aXN0aW5nT3JkZXJDb25jZXB0XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkT3JkZXIgIT09IGV4aXN0aW5nT3JkZXJDb25jZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcmRlcnMucHVzaChleGlzdGluZ09yZGVyc1tvcmRlcl0ub3JkZXJVdWlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRGVsZXRlZCBPcmRlcnMgJywgZGVsZXRlT3JkZXJzKTtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU9yZGVycztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRPcmRlck5vZGVWYWx1ZXMobm9kZSwgb3JkZXJzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIG5vZGVbJ2luaXRpYWxWYWx1ZSddID0gb3JkZXJzO1xuICAgICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgICAgICAgICAgbm9kZS5jcmVhdGVDaGlsZE5vZGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ge307XG4gICAgICAgICAgICB2YWx1ZVtub2RlLnF1ZXN0aW9uLmtleV0gPSBvcmRlci5jb25jZXB0O1xuICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbm9kZS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICBjaGlsZE5vZGUuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ2luaXRpYWxWYWx1ZSddID0gdmFsdWU7XG4gICAgICAgICAgICBjaGlsZE5vZGVbJ29yZGVyTnVtYmVyJ10gPSBvcmRlci5vcmRlck51bWJlcjtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTZXQgVmFsdWUnLCBub2RlLmNoaWxkcmVuW2luZGV4XS5jb250cm9sLnZhbHVlLCBub2RlLCBjaGlsZE5vZGUpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbmRUZXN0T3JkZXJRdWVzdGlvbk5vZGVzKGZvcm1Ob2RlKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtTm9kZS5jaGlsZHJlbltrZXldLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZFRlc3RPcmRlclF1ZXN0aW9uTm9kZXMoZm9ybU5vZGUuY2hpbGRyZW5ba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maW5kVGVzdE9yZGVyUXVlc3Rpb25Ob2Rlcyhmb3JtTm9kZS5jaGlsZHJlbltrZXldKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybU5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIGluIGZvcm1Ob2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBmb3JtTm9kZS5jaGlsZHJlbltub2RlXS5xdWVzdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24uZXh0cmFzICYmIHF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAndGVzdE9yZGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1PcmRlck5vZGVzLnB1c2goZm9ybU5vZGUuY2hpbGRyZW5bbm9kZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocXVlc3Rpb24uZXh0cmFzICYmIHF1ZXN0aW9uLmV4dHJhcy50eXBlID09PSAnT3JkZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybU9yZGVyTm9kZXMucHVzaChmb3JtTm9kZS5jaGlsZHJlbltub2RlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxuIl19