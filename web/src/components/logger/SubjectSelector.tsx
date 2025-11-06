import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Subject } from "scripts/types";
import { getAllSubjects } from "scripts/api_methods";
import { useToast } from "providers/ToastProvider";


type SubSelProps = {
    subject: string,
    onSubjectChange: (value: string) => void,
    isDisabled: boolean
};

export default function SubjectSelector(props: SubSelProps) {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const {toast, errorToast} = useToast();

    useEffect(() => {

        async function loadActiveSubjects() {
            try {
                const allSubjects = await getAllSubjects();
                setSubjects(allSubjects.filter((subject) => subject.isActive));
            } catch (e) {
                console.error("Unexpected subject selector error.", e);
                errorToast();
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
