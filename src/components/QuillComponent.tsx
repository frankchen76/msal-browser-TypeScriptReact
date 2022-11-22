import { Label } from "@fluentui/react";
import { clone } from "lodash";
import { Sources, Delta } from "quill";
import * as React from "react";
import { useState } from "react";
// import * as Quill from "quill";
import { Control, useController } from "react-hook-form";
import ReactQuill, { Quill } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import "../styles/main.css";

// this is not working for function component
function insertStar1() {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, "★");
    // const value = `<p>test</p>`;
    // const delta = this.quill.clipboard.convert(value);

    // this.quill.setContents(delta, 'silent');
    // //this.quill.container.firstChild.innerHTML = value;
    this.quill.setSelection(cursorPosition + 1);
}
export interface IQuillComponentProps {
    description: string;
}

//export class QuillEditor extends React.Component<IQuillComponentProps, IQuillComponentState> {
export const QuillComponent = (props: IQuillComponentProps) => {
    const [editorHtml, setEditorHtml] = useState<string>();
    // constructor(props) {
    //     super(props);
    //     this.state = { editorHtml: "" };
    //     this.handleChange = this.handleChange.bind(this);
    // }

    const CustomButton = () => <span className="ms-Icon ms-Icon--PinSolid12" />;

    /*
     * Event handler to be attached using Quill toolbar module (see line 73)
     * https://quilljs.com/docs/modules/toolbar/
     */
    //   private insertStar() {
    //     const cursorPosition = this.quill.getSelection().index;
    //     this.quill.insertText(cursorPosition, "★");
    //     this.quill.setSelection(cursorPosition + 1);
    //   }

    /*
     * Custom toolbar component including insertStar button and dropdowns
     */
    const CustomToolbar = () => (
        <div id="toolbar">
            <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                <option value="1" />
                <option value="2" />
                <option selected />
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <select className="ql-color">
                <option value="red" />
                <option value="green" />
                <option value="blue" />
                <option value="orange" />
                <option value="violet" />
                <option value="#d0d1d2" />
                <option selected />
            </select>
            <button className="ql-footer">
                <CustomButton />
            </button>
        </div>
    );
    const handleChange = (html) => {
        // this.setState({ editorHtml: html });
        setEditorHtml(html);
    }

    /* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
    const modules = {
        toolbar: {
            container: "#toolbar",
            handlers: {
                footer: insertStar1
            }
        },
        clipboard: {
            matchVisual: false,
        }
    };

    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color"
    ];

    //   /* 
    //    * PropType validation
    //    */
    //   private propTypes = {
    //     placeholder: PropTypes.string
    //   };

    return (
        <div className="text-editor">
            <Label>Description</Label>
            <CustomToolbar />
            {/* {this.CustomToolbar()} */}
            <ReactQuill
                defaultValue={props.description}
                onChange={handleChange}
                //   placeholder={this.props.placeholder}
                modules={modules}
                formats={formats}
                className="myQuill"
                theme={"snow"} // pass false to use minimal theme
            />
        </div>
    );
}

