import { Skeleton } from "@mui/material";
import { getSummary } from "scripts/api_methods";

export default function QuickSummary(){
	getSummary().then((res) => console.log(res));
    return (
        <Skeleton animation={false} height={250}/>
    );
}
