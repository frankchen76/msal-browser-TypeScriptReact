import { IconButton, Label } from "@fluentui/react";
import { clone } from "lodash";
import { Sources, Delta } from "quill";
import * as React from "react";
// import * as Quill from "quill";
import { Control, useController } from "react-hook-form";
import ReactQuill, { Quill } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import "../styles/main.css";

function insertStar1() {
    const cursorPosition = this.quill.getSelection().index;
    //this.quill.insertText(cursorPosition, "★");
    const value = `<h2>Test</h2>`;
    // const delta = this.quill.clipboard.convert(value);

    // this.quill.setContents(delta, 'silent');
    this.quill.container.firstChild.innerHTML = value;
    this.quill.setSelection(cursorPosition + 1);
}

export interface IQuillComponentProps {
    label: string;
    description: string;
    onChange?: (content: string) => void;
}
export interface IQuillComponentState {
    editorHtml: string;
    mailChecked: boolean;
}
export class QuillEditor extends React.Component<IQuillComponentProps, IQuillComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            editorHtml: "",
            mailChecked: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.footerHandler = this.footerHandler.bind(this);
    }

    private CustomButton = () => <span title="insert email content" className="ms-Icon ms-Icon--Mail" />;

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
    private CustomToolbar = () => (
        <div id="toolbar">
            <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                <option value="1" />
                <option value="2" />
                <option selected />
            </select>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
                <button className="ql-blockquote" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats">
                <button className="ql-link" />
                <button className="ql-image" />
                <button className="ql-video" />
            </span>
            {/* <select className="ql-color">
                <option value="red" />
                <option value="green" />
                <option value="blue" />
                <option value="orange" />
                <option value="violet" />
                <option value="#d0d1d2" />
                <option selected />
            </select> */}
            <span className="ql-formats">
                <IconButton iconProps={{ iconName: 'mail' }} 
                    toggle
                    checked={this.state.mailChecked}
                    onClick={this.footerHandler} />
                {/* <button className="ql-footer">
                    <CustomButton />
                    {this.CustomButton()}
                </button> */}
            </span>
        </div>
    );
    private handleChange(html) {
        let newValue = "";
        if (html != "<p><br></p>")
            newValue = html;
        console.log("newValue", newValue);
        this.setState({ editorHtml: newValue });
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }
    private footerHandler():void{
        let newValue="<h3>welcome to the world</h3>";
        if(this.state.mailChecked){
            newValue="";
        }
        this.setState({
            editorHtml: newValue,
            mailChecked: !this.state.mailChecked
        });
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    /* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
    private modules = {
        toolbar: {
            container: "#toolbar",
            // handlers: {
            //     footer: this.footerHandler
            // }
        },
        clipboard: {
            matchVisual: false,
        }
    };

    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    private formats = [
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

    render() {
        return (
            <div className="text-editor">
                <Label>{this.props.label}</Label>
                {/* <CustomToolbar /> */}
                {this.CustomToolbar()}
                <ReactQuill
                    defaultValue={this.props.description}
                    // onChange={this.handleChange}
                    value={this.state.editorHtml}
                    //   placeholder={this.props.placeholder}
                    modules={this.modules}
                    formats={this.formats}
                    className="myQuill"
                    //theme={"snow"} // pass false to use minimal theme
                />
            </div>
        );
    }
}
// class InsertHandler{
//     private _text: string;
//     private _self=this;
//     constructor(text: string){
        
//     }
// }

