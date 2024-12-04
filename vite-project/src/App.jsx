import React, { PureComponent } from "react";
import EmployeeList from "./components/EmployeeList";
import "./styles/App.css";

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            searchQuery: "",
            departmentFilter: "All",
        };
    }
    componentDidMount() {
        fetch("https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood")
            .then((response) => response.json())
            .then((data) => this.setState({ employees: data }))
            .catch((error) => console.error("Error fetching data:", error));
    }
    onSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };
    onFilterChange = (event) => {
        this.setState({ departmentFilter: event.target.value });
    };

    onRemoveClick = (name) => {
        const clone = this.state.employees.filter(
            (employee) => employee.name !== name
        );
        this.setState({ employees: clone });
    };
    render() {
        const { employees, searchQuery, departmentFilter } = this.state;

        const uniqueDepartments = [
            "All",
            ...new Set(employees.map((employee) => employee.department)),
        ];
        const filteredEmployees = employees.filter((employee) => {
            const matchesSearchQuery = employee.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesDepartment =
                departmentFilter === "All" || employee.department === departmentFilter;

            return matchesSearchQuery && matchesDepartment;
        });
        return (
            <div className="app">
                <h1>Employee Directory</h1>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={this.onSearchChange}
                    />
                    <select value={departmentFilter} onChange={this.onFilterChange}>
                        {uniqueDepartments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
                <EmployeeList
                    employees={filteredEmployees}
                    onRemoveClick={this.onRemoveClick}
                />
            </div>
        );
    }
}