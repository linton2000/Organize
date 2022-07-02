import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type myProps = {
    subject: string,
    onSubjectChange: (value: string) => void
}

export default function SubjectSelector(props: myProps) {

    const handleChange = (event: SelectChangeEvent) => {
        props.onSubjectChange(event.target.value)
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
                Subject
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.subject}
                label="subject"
                onChange={handleChange}
            >
                <MenuItem value={"Organize"}>Organize</MenuItem>
                <MenuItem value={"FIT2004"}>FIT2004</MenuItem>
                <MenuItem value={"AI Book"}>AI Book</MenuItem>
            </Select>
        </FormControl>
    );
}
