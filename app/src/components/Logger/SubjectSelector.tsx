import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SubSelProps = {
    subject: string,
    onSubjectChange: (value: string) => void,
    isDisabled: boolean
};

export default function SubjectSelector(props: SubSelProps) {
    const handleChange = (event: SelectChangeEvent) => {
        props.onSubjectChange(event.target.value);
    };

    const subjects = ["DSA/Leetcode", "Coursera ML", "test subject"];

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.subject}
                label="subject"
                onChange={handleChange}
                disabled={props.isDisabled}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {subjects.map((subject) => (
                    <MenuItem value={subject}>{subject}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
