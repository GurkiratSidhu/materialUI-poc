import "./App.css";
import React, { useState } from "react";
// import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import {
	makeStyles,
	ThemeProvider,
	createTheme,
} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@mui/icons-material";

// import FormulaParser from "./parser";

// import Parser from "./parser";
// import SUPPORTED_FORMULAS from "./supported-formulas";

// import "fontsource-roboto.css";
// import SaveIcon from "@material-ui/icons/Save";

fetch("https://reqres.in/api/users")
	.then((res) => {
		if (res.ok) {
			console.log("Successful response from API");
		} else {
			console.log("No response from API");
		}
		res.json();
	})
	.then((data) => console.log(data))
	.catch((error) => console.log("Network error"));

fetch("https://reqres.in/api/users", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		name: "New User",
	}),
})
	.then((res) => res.json())
	.then((data) => console.log(data));

const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #FE688B, #FF8E53)",
		border: 0,
		marginBottom: 15,
		borderRadius: 15,
		color: "white",
		padding: "5px 30px",
	},
});

const theme = createTheme({
	palette: {
		primary: {
			main: blue[500],
		},
		secondary: {
			main: blue[900],
		},
	},
});

function ButtonStyled() {
	const classes = useStyles();
	return <Button className={classes.root}>Styled Button</Button>;
}

function CheckboxExample() {
	const [checked, setChecked] = React.useState(true);
	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
					color="primary"
					disabled
					inputProps={{ "aria-label": "secondary checkbox" }}
				/>
			}
			label="Checkbox"
		/>
	);
}

function App() {
	// var FormulaParser = require("hot-formula-parser").Parser;
	// var parser = new FormulaParser();
	// parser.parse("(1 + 5 + (5 * 10)) / 10");
	// parser.parse("SUM(MY_VAR)");
	// parser.parse("1;;1");

	const [user, setuser] = React.useState([]);
	React.useEffect(() => {
		fetch("https://reqres.in/api/users")
			.then((res) => res.json())
			.then((data) => setuser(data.data));
	}, []);
	console.log(user);

	const FormulaParser = require("hot-formula-parser").Parser;
	const parser = new FormulaParser();
	parser.setVariable("num1", 5);
	parser.setVariable("num2", 10);
	parser.setVariable("num3", 10);
	console.log(parser.parse("num1 + num2 + num3"));
	console.log(parser.getVariable("num1"));
	console.log(parser.getVariable("num2"));
	console.log(parser.getVariable("num3"));
	console.log(parser.parse("SUM(10, 50, 50)"));
	console.log(parser.parse("AVERAGE(10, 50, 50)"));
	console.log(parser.parse("MAX(10, 50, 50)"));
	console.log(parser.parse("MIN(10, 50, 50)"));
	console.log(parser.parse("5"));
	console.log(parser.parse("sdjdd"));

	function DisplayResult() {
		// const Calculate = parser.parse("SUM(A, B, C)");
		const Calculate = 1 + 2;
		alert({ Calculate });
		return Calculate;
	}

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Container>
					<TextField id="A" label="A" variant="outlined" />
					<TextField id="B" label="B" variant="outlined" />
					<TextField id="C" label="C" variant="outlined" />
					<Button
						variant="contained"
						size="large"
						onClick={() => {
							DisplayResult();
						}}
					>
						Show Result
					</Button>
				</Container>

				<Container>
					<TextField
						variant="filled"
						color="secondary"
						type="email"
						label="Email"
						placeholder="example@example.com"
					/>
					<TextField variant="outlined" color="secondary" type="time" />

					<CheckboxExample />

					<ButtonGroup variant="outlined" color="primary">
						<Button
							// startIcon={<SaveIcon />}
							size="large"
							style={{ fontsize: "10px" }}
							variant="contained"
							color="secondary"
						>
							Hello World
						</Button>
						<ButtonStyled />
					</ButtonGroup>
				</Container>
				<Container>
					<Grid container spacing={2}>
						{user.map((x, i) => (
							<Grid item xs={12} sm={6} md={3}>
								<Card elevation={2} item key={i}>
									<CardHeader
										action={
											<IconButton>
												<DeleteOutlined />
											</IconButton>
										}
										title={x.first_name + " " + x.last_name}
										subheader={x.email}
									/>
									<CardContent>
										<Typography variant="body2" color="textSecondary">
											{x.email +
												" " +
												x.id +
												" " +
												x.first_name +
												" " +
												x.last_name}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
				<Container>
					<Card>
						<Typography>Excel Calculations</Typography>
					</Card>
				</Container>
			</div>
		</ThemeProvider>
	);
}

export default App;
