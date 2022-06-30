import React, { Component, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default class SubjectSelector extends Component {
    subject: string | null;
    selectElement: React.RefObject<any>;
    
    constructor(props: {}) {
        super(props);
        this.subject = null;
        this.selectElement = React.createRef();
    }

    getSubject() {
        return this.subject;
    }

    handleChange() {
        this.subject = this.selectElement.current.value;
    }

    render() {
        return (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Select Subject
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="subject_selector"
                    ref={this.selectElement}
                    value={this.subject}
                    onChange={this.handleChange.bind(this)}
                >
                    <MenuItem value={"FIT2004"}>FIT2004</MenuItem>
                    <MenuItem value={"ENG1001"}>ENG1001</MenuItem>
                    <MenuItem value={"Organize"}>Organize</MenuItem>
                </Select>
            </FormControl>
        );
    }
}
