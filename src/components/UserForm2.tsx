import { Dropdown, IDropdownOption, PrimaryButton, Shimmer, ShimmerElementsGroup, ShimmerElementType, Spinner, TextField } from "@fluentui/react";
import _ = require("lodash");
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Control, Controller, useController, useForm, useWatch } from "react-hook-form";
import { AzureDevOpsService, AzureDevOpsServiceContext } from "../services/AzureDevOpsService";
import { JsonOutput } from "./JsonOutput";

type FormInput = {
    title: string;
    projectId: string;
    areaId: number;
    issueId: number
};

export const UserForm2 = () => {
    const [service, setService] = useState<AzureDevOpsService>(new AzureDevOpsService());
    const [task, setTask] = useState<FormInput>();
    const [jsonObj, setJsonObj] = useState<any>();
    const { control, watch, formState: { errors }, handleSubmit } = useForm<FormInput>();

    useEffect(() => {
        const loadTask = async () => {
            setTimeout(() => {
                const t: FormInput = {
                    title: "Test1",
                    projectId: "Frank",
                    areaId: 60,
                    issueId: 50
                };
                // const t: FormInput = {
                //     title: "",
                //     projectId: undefined,
                //     areaId: undefined,
                //     issueId: undefined
                // };
                setTask(t);

            }, 5000);
        };
        loadTask();
    }, []);

    const btnSaveHandler = () => {
        // setValidationError(null);
        // setValidFormData(null);
        //merge state when using useState
        //setValidFormData(state=>({...state, firstName:"test"}));
        handleSubmit(
            (data) => {
                console.log("validation successed:", data);
                setJsonObj(data);
            },
            (err) => {
                console.log(`validation error:`, err);
                //setValidationError(err);
            }
        )();
    };

    return (
        <AzureDevOpsServiceContext.Provider value={service}>
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <h2>Create User</h2>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={task != null}>
                            {task && <CtrlTextField
                                label="Title:"
                                name="title"
                                rules={{ required: "Title Id is required" }}
                                control={control}
                                errors={errors}
                                defaultValue={task ? task.title : ""}
                            />}
                        </Shimmer>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={task != null}>
                            {task && <CtrlWatchDropdown
                                label="Project Id"
                                name="projectId"
                                rules={{ required: "Project Id is required" }}
                                control={control}
                                errors={errors}
                                defaultValue={task ? task.projectId : undefined}
                                onGetOptions={service.getProjects}
                            />}
                            {/* <CtrlProjectDropdown
                        label="Project Id"
                        name="projectId"
                        rules={{ required: "Project Id is required" }}
                        control={control}
                        errors={errors}
                        defaultValue={task ? task.projectId : undefined}
                    /> */}
                        </Shimmer>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={task != null}>
                            {task && <CtrlWatchDropdown
                                label="Area Id"
                                name="areaId"
                                rules={{ required: "Area Id is required" }}
                                control={control}
                                errors={errors}
                                defaultValue={task ? task.areaId : undefined}
                                onGetOptions={service.getAreas}
                                watchedName1="projectId"
                            />}
                            {/* <CtrlAreaDropdown
                        label="Area Id"
                        name="areaId"
                        rules={{ required: "Area Id is required" }}
                        control={control}
                        errors={errors}
                        defaultValue={task ? task.areaId : undefined}
                    /> */}
                        </Shimmer>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={task != null}>
                            {task && <CtrlWatchDropdown
                                label="Issue Id"
                                name="issueId"
                                rules={{ required: "Issue Id is required" }}
                                control={control}
                                errors={errors}
                                defaultValue={task ? task.issueId : undefined}
                                onGetOptions={service.getIssues}
                                watchedName1="projectId"
                                watchedName2="areaId"
                            />}
                            {/* <CtrlIssueDropdown
                        label="Issue Id"
                        name="issueId"
                        rules={{ required: "Issue Id is required" }}
                        control={control}
                        errors={errors}
                        defaultValue={task ? task.issueId : undefined}
                    /> */}
                        </Shimmer>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <PrimaryButton text="Save" onClick={btnSaveHandler} />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                        <JsonOutput jsonObj={jsonObj} />
                    </div>
                </div>
            </div>
        </AzureDevOpsServiceContext.Provider>
    );
};

export interface ICtrlProps {
    label: string;
    name: string;
    rules: any;
    control: Control<any>;
    errors: any;
};

export interface ICtrlWatchDropdownProps extends ICtrlProps {
    watchedName1?: string;
    watchedName2?: string;
    defaultValue?: string | number;
    //onGetOptions: (p1: string, p2: string) => Promise<IDropdownOption[]>;
    onGetOptions: (...param: string[]) => Promise<IDropdownOption[]>;
}
export const CtrlWatchDropdown = (props: ICtrlWatchDropdownProps) => {
    //const service = useContext(AzureDevOpsServiceContext);
    const { field } = useController({
        control: props.control,
        name: props.name
    });
    const watchField1 = props.watchedName1 == null ? null : useWatch({
        control: props.control,
        name: props.watchedName1
    });
    const watchField2 = props.watchedName2 == null ? null : useWatch({
        control: props.control,
        name: props.watchedName2
    });
    const effectArray = [];
    if (watchField1 != null) effectArray.push(watchField1);
    if (watchField2 != null) effectArray.push(watchField2);

    const [loaded, setLoaded] = useState<boolean>(false);
    const [options, setOptions] = useState<IDropdownOption[]>();
    const [selectedKey, setSelectedKey] = useState<string | number>(props.defaultValue);
    console.log(props.name);

    useEffect(() => {
        const loadOptions = async () => {
            setLoaded(false);
            const newOptions = await props.onGetOptions(watchField1, watchField2);
            const existOption = _.find(newOptions, { key: props.defaultValue }) != null;
            setOptions(newOptions);
            if (props.defaultValue && existOption) {
                setSelectedKey(props.defaultValue);
                field.onChange(props.defaultValue);
            } else {
                setSelectedKey(newOptions[0].key);
                field.onChange(newOptions[0].key);
            }
            setLoaded(true);
        };

        loadOptions();
    }, [watchField1, watchField2]);
    return (
        <Controller
            name={props.name}
            rules={props.rules}
            defaultValue={selectedKey}
            control={props.control}
            render={({ field }) => {
                //console.log("field name:", field.name, "value:", props.selectedKey, "options:", props.options);
                return (
                    <div>
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={loaded}>
                            <Dropdown
                                label={props.label}
                                // {...field}
                                options={options ? options : []}
                                onChange={(e, option): void => field.onChange(option.key)}
                                selectedKey={field.value}
                            />
                            <span className="formError">{props.errors[props.name]?.type === 'required' && props.errors[props.name].message}</span>
                        </Shimmer>
                    </div>
                );
            }}
        />
    );

};
export interface ICtrlProjectDropdownProps extends ICtrlProps {
    defaultValue?: string | number;
    //onGetOptions: (p1: string, p2: string) => Promise<IDropdownOption[]>;
};
export const CtrlProjectDropdown = (props: ICtrlProjectDropdownProps) => {
    const service = useContext(AzureDevOpsServiceContext);
    const { field } = useController({
        control: props.control,
        name: props.name
    });
    const [options, setOptions] = useState<IDropdownOption[]>();
    const [selectedKey, setSelectedKey] = useState<string | number>(props.defaultValue);
    console.log(props.name);

    useEffect(() => {
        const loadOptions = async () => {
            const newOptions = await service.getProjects("", "");
            setOptions(newOptions);
            if (props.defaultValue) {
                setSelectedKey(props.defaultValue);
                field.onChange(props.defaultValue);
            } else {
                setSelectedKey(newOptions[0].key);
                field.onChange(newOptions[0].key);
            }
        };

        loadOptions();
    }, [props.defaultValue]);
    return (
        <Controller
            name={props.name}
            rules={props.rules}
            defaultValue={selectedKey}
            control={props.control}
            render={({ field }) => {
                //console.log("field name:", field.name, "value:", props.selectedKey, "options:", props.options);
                return (
                    <div>
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={options != null}>
                            <Dropdown
                                label={props.label}
                                // {...field}
                                options={options ? options : []}
                                onChange={(e, option): void => field.onChange(option.key)}
                                selectedKey={field.value}
                            />
                            <span className="formError">{props.errors[props.name]?.type === 'required' && props.errors[props.name].message}</span>
                        </Shimmer>
                    </div>
                );
            }}
        />
    );
};
export interface ICtrlAreaDropdownProps extends ICtrlProps {
    defaultValue?: string | number;
    //onGetOptions: (p1: string, p2: string) => Promise<IDropdownOption[]>;
};
export const CtrlAreaDropdown = (props: ICtrlAreaDropdownProps) => {
    const service = useContext(AzureDevOpsServiceContext);
    const { field } = useController({
        control: props.control,
        name: props.name
    });
    const projectField = useWatch({
        control: props.control,
        name: "projectId"
    });
    const [loaded, setLoaded] = useState<boolean>(false);
    const [options, setOptions] = useState<IDropdownOption[]>();
    const [selectedKey, setSelectedKey] = useState<string | number>(props.defaultValue);
    console.log(props.name);

    useEffect(() => {
        const loadOptions = async () => {
            setLoaded(false);
            const newOptions = await service.getAreas(projectField, "");
            const existOption = _.find(newOptions, { key: props.defaultValue }) != null;
            setOptions(newOptions);
            if (props.defaultValue && existOption) {
                setSelectedKey(props.defaultValue);
                field.onChange(props.defaultValue);
            } else {
                setSelectedKey(newOptions[0].key);
                field.onChange(newOptions[0].key);
            }
            setLoaded(true);
        };

        loadOptions();
    }, [projectField]);
    return (
        <Controller
            name={props.name}
            rules={props.rules}
            defaultValue={selectedKey}
            control={props.control}
            render={({ field }) => {
                //console.log("field name:", field.name, "value:", props.selectedKey, "options:", props.options);
                return (
                    <div>
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={loaded}>
                            <Dropdown
                                label={props.label}
                                // {...field}
                                options={options ? options : []}
                                onChange={(e, option): void => field.onChange(option.key)}
                                selectedKey={field.value}
                            />
                            <span className="formError">{props.errors[props.name]?.type === 'required' && props.errors[props.name].message}</span>
                        </Shimmer>
                    </div>
                );
            }}
        />
    );
};
export interface ICtrlIssueDropdownProps extends ICtrlProps {
    defaultValue?: string | number;
    //onGetOptions: (p1: string, p2: string) => Promise<IDropdownOption[]>;
};
export const CtrlIssueDropdown = (props: ICtrlIssueDropdownProps) => {
    const service = useContext(AzureDevOpsServiceContext);
    const { field } = useController({
        control: props.control,
        name: props.name
    });
    const projectField = useWatch({
        control: props.control,
        name: "projectId"
    });
    const areaField = useWatch({
        control: props.control,
        name: "areaId"
    });
    const [loaded, setLoaded] = useState<boolean>(false);
    const [options, setOptions] = useState<IDropdownOption[]>();
    const [selectedKey, setSelectedKey] = useState<string | number>(props.defaultValue);
    console.log(props.name);

    useEffect(() => {
        const loadOptions = async () => {
            setLoaded(false);
            const newOptions = await service.getIssues(projectField, areaField);
            const existOption = _.find(newOptions, { key: props.defaultValue }) != null;
            setOptions(newOptions);
            if (props.defaultValue && existOption) {
                setSelectedKey(props.defaultValue);
                field.onChange(props.defaultValue);
            } else {
                setSelectedKey(newOptions[0].key);
                field.onChange(newOptions[0].key);
            }
            setLoaded(true);
        };

        loadOptions();
    }, [projectField, areaField]);
    return (
        <Controller
            name={props.name}
            rules={props.rules}
            defaultValue={selectedKey}
            control={props.control}
            render={({ field }) => {
                //console.log("field name:", field.name, "value:", props.selectedKey, "options:", props.options);
                return (
                    <div>
                        <Shimmer customElementsGroup={ShimmerCtrl()} isDataLoaded={loaded}>
                            <Dropdown
                                label={props.label}
                                // {...field}
                                options={options ? options : []}
                                onChange={(e, option): void => field.onChange(option.key)}
                                selectedKey={field.value}
                            />
                            <span className="formError">{props.errors[props.name]?.type === 'required' && props.errors[props.name].message}</span>
                        </Shimmer>
                    </div>
                );
            }}
        />
    );
};
export interface ICtrlTextFieldProps extends ICtrlProps {
    defaultValue: string;
}
export const CtrlTextField = (props: ICtrlTextFieldProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            defaultValue={props.defaultValue}
            render={({ field }) => {
                //console.log("value:", field.value, "defaultValue:", props.defaultValue);
                return (
                    <div>
                        <TextField required label={props.label} {...field} />
                        <span className="formError">{props.errors[props.name]?.type === 'required' && props.errors[props.name].message}</span>
                        <span className="formError">{props.errors[props.name]?.type === 'validate' && props.errors[props.name].message}</span>
                    </div>)
            }}
        />

    );
};

export const ShimmerCtrl = () => {
    return (
        <ShimmerElementsGroup
            flexWrap
            width="100%"
            shimmerElements={[
                { type: ShimmerElementType.line, width: "30%", height: 25 },
                { type: ShimmerElementType.gap, width: "70%", height: 25 },
                { type: ShimmerElementType.line, width: "100%", height: 30 }
            ]}
        />
    );
};


