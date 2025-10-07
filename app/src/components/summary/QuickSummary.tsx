import * as React from "react";
import { Stack } from "@mui/material";
import LastWorked from "./LastWorked";
import { getSummary } from "scripts/api_methods";

interface QuickSummaryState {
	lwDate: Date;
}

export default class QuickSummary 
	extends React.Component<any, QuickSummaryState>{

	constructor(props: any){
		super(props);
		this.state = { lwDate: new Date() };
	}

	componentDidMount() {
		getSummary().then(
			(res) => this.setState({ lwDate: new Date(res.lastWorked*1000) })
		);
	}

	componentDidUpdate() {
        if (this.props.rerender == true) {
            getSummary().then(
				(res) => this.setState({ lwDate: new Date(res.lastWorked*1000) })
			);
            this.props.setRerender(false);
        }
    }

	render() {
		return (
			<Stack spacing={2}>
				<h1></h1>
				<LastWorked lwDate={this.state.lwDate} />
			</Stack>
		);
	}
}
