// demonstrate form validation

import * as React from "react";
import { useForm, Controller, DeepMap, FieldError } from "react-hook-form";
import { Dropdown, IDropdownOption, PrimaryButton, TextField } from "@fluentui/react";
import { FC, useState } from "react";
// import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormInput {
    firstName: string;
    iceCreamType: { label: string; value: string };
}

export const UserForm: FC = () => {
    const [index, setIndex] = useState(0);
    const [validating, setValidating] = useState(false);
    const [validFormData, setValidFormData] = useState<IFormInput>();
    const [validationError, setValidationError] = useState<DeepMap<IFormInput, FieldError>>();
    const schema = yup.object().shape({
        firstName: yup.string().required()
    });
    const { control, handleSubmit, errors } = useForm<IFormInput>({
        defaultValues: {
            firstName: "",
            iceCreamType: null
        },
        reValidateMode: "onChange",
        mode: "all"
    });

    // const onSubmit = (data: IFormInput) => {
    //     setValidationError(null);
    //     setValidFormData(null);

    //     handleSubmit(
    //         (data) => {
    //             console.log(data);
    //             setValidFormData(data);
    //         },
    //         (err) => {
    //             console.log(err);
    //             setValidationError(err);
    //         }
    //     )();
    // };
    const btnSaveHandler = () => {
        setValidationError(null);
        setValidFormData(null);
        //merge state when using useState
        //setValidFormData(state=>({...state, firstName:"test"}));

        handleSubmit(
            (data) => {
                console.log(data);
                setValidFormData(data);
            },
            (err) => {
                console.log(err);
                setValidationError(err);
            }
        )();
    };
    const formSubmitHandler = (data: IFormInput) => {
        console.log(data);
    }

    const options: IDropdownOption[] = [
        { key: 'chocolate', text: 'Chocolate' },
        { key: 'banana', text: 'Banana' },
        { key: 'apple', text: 'Apple' }
    ];
    const nameof = <T extends {}>(name: keyof T) => name;

    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <h2>Create User</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {/* <form onSubmit={handleSubmit(formSubmitHandler)}> */}
                    <Controller
                        name={nameof<IFormInput>("firstName")}
                        rules={{ required: "need value" }}
                        control={control}
                        render={(field, fieldState) =>
                            <TextField
                                name={field.name}
                                label={"Name"}
                                onBlur={field.onBlur}
                                onChange={field.onChange}
                                value={field.value}
                                errorMessage={errors.firstName == null ? "" : errors.firstName.message} />}
                    />
                    <Controller
                        name="iceCreamType"
                        control={control}
                        render={(field, fieldState) =>
                            <Dropdown
                                label={"Ice cream type"}
                                options={options}
                                onChange={(e, option): void => field.onChange(option.key)}
                                selectedKey={field.value}
                            />}
                    />
                    <PrimaryButton text="Submit" onClick={btnSaveHandler} />
                    {/* </form disabled={errors.firstName != null || errors.iceCreamType != null} > */}
                </div>
            </div>
        </div>
    );
}
// export class UserForm extends React.Component<{}, {}> {


//     private onSubmit = (data: IFormInput) => {
//         console.log(data)
//     };

//     render() {
//         const { control, handleSubmit } = useForm<IFormInput>();
//         const options: IDropdownOption[] = [
//             { key: 'chocolate', text: 'Chocolate' },
//             { key: 'banana', text: 'Banana' },
//             { key: 'apple', text: 'Apple' }
//         ];

//         return (
//             <div className="ms-Grid">
//                 <div className="ms-Grid-row">
//                     <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
//                         <h2>Create User</h2>
//                     </div>
//                 </div>
//                 <div className="ms-Grid-row">
//                     <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
//                         <form onSubmit={handleSubmit(this.onSubmit)}>
//                             <Controller
//                                 name="firstName"
//                                 control={control}
//                                 defaultValue=""
//                                 render={({ onChange, value }) => <TextField onChange={onChange} value={value} />}
//                             />
//                             <Controller
//                                 name="iceCreamType"
//                                 control={control}
//                                 options={options}
//                                 as={Dropdown}
//                             />
//                             <PrimaryButton type="submit" text="Submit" />
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }