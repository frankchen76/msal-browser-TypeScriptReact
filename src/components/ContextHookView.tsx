import * as React from "react";
import { PrimaryButton, TextField } from "@fluentui/react";
import { createContext, useContext, useState } from "react";
import { values } from "lodash";

export const ContextHookView = () => {
    const onNameChange = (val: Order) => {
        setOrderService({ order: val, onNameChange: onNameChange });
    };
    const [orderService, setOrderService] = useState<IOrderService>({ order: { name: "test" }, onNameChange: onNameChange });

    return (
        <OrderServiceContext.Provider value={orderService} >
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <h2>ContextHook</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <span>Name: {orderService.order.name}</span>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <DisplayView />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <ControlView />
                    </div>
                </div>
            </div>
        </OrderServiceContext.Provider>
    );
};

// export class OrderService {
//     constructor(public name: string,
//         private onSettingServiceUpdateCallback: (settingService: SettingService) => void) {

//     }

//     public updateName(name: string) {
//         this.name = name;
//         if (this.onSettingServiceUpdateCallback) {
//             this.onSettingServiceUpdateCallback(this);
//         }
//     }
// }
class Order {
    constructor(public name: string) {

    }
}
interface IOrderService {
    order: Order;
    onNameChange: (val: Order) => void;
};

const OrderServiceContext = createContext<IOrderService>(null);

const DisplayView = () => {
    const service = useContext(OrderServiceContext);
    return (
        <div>
            <span>DisplayView:</span>
            <span>Name: {service.order.name}</span>
        </div>
    );
};
const ControlView = () => {
    const service = useContext(OrderServiceContext);
    const [name, setName] = React.useState<string>("");
    const onChangeHandler = () => {
        service.onNameChange(new Order(name));
    };
    return (
        <div>
            <span>ControlView:</span>
            <TextField label="Name" value={name} onChange={(event, val) => { setName(val) }} />
            <PrimaryButton text="Change" onClick={onChangeHandler} />
        </div>
    );

};
