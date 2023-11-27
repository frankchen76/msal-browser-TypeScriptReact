import { Dropdown, IDropdownOption, PrimaryButton, Spinner, TextField } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { Sources, Delta } from "quill";
// import { QuillEditor } from "./QuillEditor";
// import { QuillComponent } from "./QuillComponent";

type FormInput = {
    firstName: string;
    userName: string;
    //iceCreamType: { label: string; value: string };
    menuType: string;
    menuOption: string;
    description: string;
    comment: string;
};

export const UserForm1 = () => {
    const [formInput, setFormInput] = useState<FormInput>();
    const { control, watch, formState: { errors }, handleSubmit } = useForm<FormInput>();
    const [menuSelections, setMenuSelections] = useState<IDropdownOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isExcuting, setIsExcuting] = useState<boolean>();

    React.useEffect(() => {
        const subscription = watch(async (value, { name, type }) => {
            console.log("watch event", value, name, type);
            if (name == "menuType") {
                return new Promise((resolve, reject) => {
                    setIsLoading(true);
                    setTimeout(() => {
                        if (name == "menuType") {
                            setMenuSelections(value.menuType == "dessert" ? dessertOptions : coursOptions);
                        }
                        setIsLoading(false);
                        resolve();
                    }, 2000);
                });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch("menuType")]);

    const onSubmit: SubmitHandler<FormInput> = data => {
        console.log(data)
    };
    const menuOptions: IDropdownOption[] = [
        { key: 'dessert', text: 'IceCream' },
        { key: 'course', text: 'Course' }
    ];
    const dessertOptions: IDropdownOption[] = [
        { key: 'chocolate', text: 'Chocolate' },
        { key: 'banana', text: 'Banana' },
        { key: 'apple', text: 'Apple' }
    ];
    const coursOptions: IDropdownOption[] = [
        { key: 'noodle', text: 'Ramen' },
        { key: 'steak', text: 'Steak' },
        { key: 'chick', text: 'Chick' }
    ];
    const btnSaveHandler = () => {
        // setValidationError(null);
        // setValidFormData(null);
        //merge state when using useState
        //setValidFormData(state=>({...state, firstName:"test"}));
        setIsExcuting(true);
        handleSubmit(
            (data) => {
                console.log("validation successed:", data);
                setFormInput(data);
                setIsExcuting(false);
            },
            (err) => {
                console.log(`validation error:`, err);
                //setValidationError(err);
                setIsExcuting(false);
            }
        )();
    };
    const onRichtextChanged = (content: string): void => {
        // let newTask = cloneDeep(task);
        // newTask.description = content;
        // setTask(newTask);

    };

    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <h2>Create User</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6" >
                    <TextField label="Firstname:" />
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6" >
                    <TextField label="Lastname:" />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <TextField label="Address:" />
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First name is required", maxLength: { value: 20, message: "the max length is 20" } }}
                        defaultValue=""
                        render={({ field }) => {
                            return (
                                <div>
                                    <TextField label="Name:" {...field} />
                                    {errors.firstName?.type === 'required' && errors.firstName.message}
                                </div>)
                        }}
                    />
                    <Controller
                        name="userName"
                        control={control}
                        rules={{
                            required: "Username is required",
                            maxLength: { value: 20, message: "the max length is 20" },
                            validate: async (val): Promise<boolean | string> => {
                                return new Promise<boolean | string>((resolve, reject) => {
                                    setTimeout(() => {
                                        resolve(val == "test" || "Username needs to be 'test'");
                                    }, 2000);
                                })
                            }
                        }}
                        defaultValue=""
                        render={({ field }) => {
                            return (
                                <div>
                                    <TextField label="Username:" {...field} />
                                    {errors.userName?.type === 'required' && errors.userName.message}
                                    {errors.userName?.type === 'maxlengh' && errors.userName.message}
                                    {errors.userName?.type === 'validate' && errors.userName.message}
                                </div>)
                        }}
                    />
                    <Controller
                        name="menuType"
                        rules={{ required: "Menu type is required" }}
                        control={control}

                        render={({ field }) => {
                            return (
                                <div>
                                    <Dropdown
                                        label="Menu Type:"
                                        {...field}
                                        options={menuOptions}
                                        onChange={(e, option): void => field.onChange(option.key)}
                                        selectedKey={field.value}
                                    />
                                    {errors.menuType?.type === 'required' && errors.menuType.message}
                                </div>
                            );
                        }}
                    />
                    <Controller
                        name="menuOption"
                        rules={{ required: "Menu option is required" }}
                        control={control}
                        render={({ field }) => {
                            return (
                                <div>
                                    <Dropdown
                                        label="Menu option:"
                                        {...field}
                                        options={menuSelections}
                                        onChange={(e, option): void => field.onChange(option.key)}
                                        selectedKey={field.value}
                                    />
                                    {isLoading && <Spinner />}
                                    {errors.menuOption?.type === 'required' && errors.menuOption.message}
                                </div>
                            );
                        }}
                    />
                    <Controller
                        name="description"
                        rules={{ required: "Description is required." }}
                        //rules={{validation:(val)=>{return true;}}}
                        control={control}
                        render={({ field }) => {
                            return (
                                <div>
                                    {/* <QuillEditor description=""
                                        label="Description"
                                        onChange={(html): void => field.onChange(html)} /> */}
                                    {/* <RichtextEditor2
                                            desc=""
                                            label="Comment:"
                                        /> */}
                                    {/* <RichtextEditor
                                            desc={field.value}
                                            control={control}
                                            name="description"
                                            label="Description:"
                                        /> */}
                                    {/* <RichtextEditor
                                            description={field.value}
                                            onEditorChange={(content: string, delta: Delta, source: Sources, editor: any): void => {
                                                console.log("Richtext", content, delta, source);
                                                field.onChange(content);
                                            }} /> */}
                                    {errors.description?.type === 'required' && errors.description.message}
                                </div>
                            );
                        }}
                    />
                    <PrimaryButton text="Submit"
                        onClick={btnSaveHandler}
                        // disabled={errors.firstName != null || errors.description != null || errors.menuOption != null || errors.menuType != null} 
                        disabled={isExcuting}
                    />
                    {/* </form> */}
                </div>
            </div>
        </div>
    );
};