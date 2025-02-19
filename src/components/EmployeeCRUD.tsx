import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";

interface Employee {
  id?: number;
  name: string;
  age: string;
  email: string;
  role: string;
  salary: string;
}

const EmployeeCRUD: React.FC = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    name: "",
    age: "",
    email: "",
    role: "",
    salary: "",
  });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3001/employees");
      const data = await response.json();
      setEmployees(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar funcionários",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const saveEmployee = async () => {
    try {
      const response = editingEmployee
        ? await fetch(`http://localhost:3001/employees/${editingEmployee.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
          })
        : await fetch("http://localhost:3001/employees", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
          });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Erro desconhecido");
      }

      toast({
        title: "Sucesso",
        description: editingEmployee
          ? "Funcionário atualizado com sucesso"
          : "Funcionário criado com sucesso",
        variant: "default",
      });

      fetchEmployees();
      setNewEmployee({ name: "", age: "", email: "", role: "", salary: "" });
      setEditingEmployee(null);
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Erro ao deletar funcionário");
      }

      toast({
        title: "Sucesso",
        description: "Funcionário deletado com sucesso",
        variant: "default",
      });
      fetchEmployees();
    } catch (error) {
      toast({
        title: "Erro",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const startEditEmployee = (employee: Employee) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...employeeData } = employee;
    setNewEmployee(employeeData);
    setEditingEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.id]: e.target.value });
  };

  return (
    <div className="container mx-auto pt-20">
      <h1 className="text-3xl font-bold mb-6">Employee Management</h1>
      <div className="mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>Add Employee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {Object.entries(newEmployee).map(([key, value]) => (
                <div key={key} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={key} className="text-right">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Label>
                  <Input
                    id={key}
                    value={value}
                    onChange={handleInputChange}
                    type={key === "age" || key === "salary" ? "number" : "text"}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <Button onClick={saveEmployee}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.age}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>${employee.salary.toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => startEditEmployee(employee)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteEmployee(employee.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeCRUD;
