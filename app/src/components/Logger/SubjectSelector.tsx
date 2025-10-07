import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Subject } from "scripts/types";
import { getAllSubjects } from "scripts/api_methods";

type SubSelProps = {
    subject: string,
    onSubjectChange: (value: string) => void,
    isDisabled: boolean
};

export default function SubjectSelector(props: SubSelProps) {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {

        async function loadActiveSubjects() {
            try {
                setSubjects((await getAllSubjects()).filter(subject => subject.isActive));
            } catch (e) {
                console.error(e);
            }
        }

        loadActiveSubjects();
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.subject}
                label="subject"
                onChange={ (e) => props.onSubjectChange(e.target.value)}
                disabled={props.isDisabled}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {subjects.map((subject) => (
                    <MenuItem key={subject.name} value={subject.name}>{subject.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
