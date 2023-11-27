import { TextField } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
//import { QuillEditor } from "./QuillEditor";

type FormInput = {
    firstName: string;
};

export const QuillTestPage = () => {
    const [formInput, setFormInput] = useState<FormInput>();
    const { control, watch, formState: { errors }, handleSubmit } = useForm<FormInput>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const onSubmit: SubmitHandler<FormInput> = data => {
        console.log(data)
    };

    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                    <h2>Quill test</h2>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        {/* <QuillEditor description="" label="Comments:" /> */}
                    </form>
                </div>
            </div>
        </div>
    );
};