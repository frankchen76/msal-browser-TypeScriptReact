import { Label } from "@fluentui/react";
import { clone } from "lodash";
import { Sources, Delta } from "quill";
import * as React from "react";
// import * as Quill from "quill";
import { Control, useController } from "react-hook-form";
import ReactQuill, { Quill } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import "../styles/main.css";

export interface IRichtextEditorProps {
    label: string;
    desc: string;
    control: Control<any>;
    name: string;
}
export const RichtextEditor = (props: IRichtextEditorProps) => {
    const { field } = useController({
        control: props.control,
        name: props.name
    });
    const [value, setValue] = React.useState(field.value || "");

    const onEditorChange = (content: string,
        delta: Delta,
        source: Sources,
        editor: any) => {

        let newValue = "";
        if (content != "<p><br></p>")
            newValue = content;
        console.log("newValue", newValue);
        setValue(newValue);
        field.onChange(newValue);
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    return (
        <div>
            <Label>{props.label}</Label>
            <ReactQuill value={value}
                onChange={onEditorChange}
                //onBlur={onQuillDescriptionBlur}
                className="myQuill"
                modules={modules}
                formats={formats} />
        </div>
    );
}
// export interface IRichtextEditorProps {
//     description: string;
//     //onChange?: (content: string) => void;
//     onEditorChange?: (
//         content: string,
//         delta: Delta,
//         source: Sources,
//         editor: any
//     ) => void;
// }
// export const RichtextEditor = (props: IRichtextEditorProps) => {
//     const modules = {
//         toolbar: [
//             [{ 'header': [1, 2, false] }],
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//             ['link', 'image'],
//             ['clean']
//         ],
//         clipboard: {
//             matchVisual: false,
//         }
//     };

//     const formats = [
//         'header',
//         'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent',
//         'link', 'image'
//     ];
//     return (
//         <ReactQuill value={props.description}
//             onChange={props.onEditorChange}
//             //onBlur={onQuillDescriptionBlur}
//             className="myQuill"
//             modules={modules}
//             formats={formats} />

//     );
// };

