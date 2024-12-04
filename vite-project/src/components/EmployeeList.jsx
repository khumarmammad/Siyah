import React from "react";
import PropTypes from "prop-types";

function EmployeeList({ employees, onRemoveClick }) {
    return (
        <div className="employee-list">
            {employees.length > 0 ? (
                employees.map((employee) => (
                    <div key={employee.id} className="employee-card">
                        <h3>{employee.name}</h3>
                        <p>Department: {employee.department}</p>
                        <button
                            type="button"
                            onClick={() => onRemoveClick(employee.name)}
                        >
                            Уволить {employee.name}
                        </button>
                    </div>
                ))
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
}
EmployeeList.propTypes = {
    employees: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            department: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRemoveClick: PropTypes.func.isRequired,
};

export default EmployeeList;