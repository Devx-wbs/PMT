import { Pencil, Trash2, Mail, Clock, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription, // ← ADD THIS LINE
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { api_url } from "@/api/Api";
import { apiHandler } from "@/api/ApiHandler";

const Section_a = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    leadMember: "",
    role: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);

  // Fetch all team members on mount
  useEffect(() => {
    const fetchMembers = async () => {
      setFetching(true);
      setError("");
      const token = localStorage.getItem("token");
      try {
        const response = await apiHandler.GetApi(
          api_url.getAllEmployees,
          token
        );
        if (Array.isArray(response)) {
          setTeamMembers(response);
        } else {
          setError(response?.message || "Failed to fetch team members");
        }
      } catch (err) {
        setError("Failed to fetch team members");
      } finally {
        setFetching(false);
      }
    };
    fetchMembers();
  }, []);

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    const payload = {
      name: addForm.name,
      email: addForm.email,
      leadMember: addForm.leadMember,
      role: addForm.role,
      location: addForm.location,
    };
    try {
      const response = await apiHandler.PostApi(
        api_url.addEmployee,
        payload,
        token
      );
      if (response && response.employee) {
        setTeamMembers((prev) => [...prev, response.employee]);
        setAddForm({
          name: "",
          email: "",
          leadMember: "",
          role: "",
          location: "",
        });
      } else {
        setError(response?.message || "Failed to add member");
      }
    } catch (err) {
      setError("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
            Team Members
          </h2>
          <p className="text-gray-500 text-sm">
            View and manage your team members
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 text-white hover:bg-blue-800">
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMember} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  value={addForm.name}
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="email@gmail.com"
                  value={addForm.email}
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="leadMember">Lead Member</Label>
                <Input
                  id="leadMember"
                  name="leadMember"
                  placeholder="Enter Lead Member"
                  value={addForm.leadMember}
                  onChange={handleAddFormChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={addForm.role}
                  onChange={handleAddFormChange}
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="team_lead">Team Lead</option>
                  <option value="team_member">Team Member</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  value={addForm.location}
                  onChange={handleAddFormChange}
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {fetching ? (
        <div className="text-center text-gray-500">Loading team members...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member._id || index}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-3 relative"
            >
              <div className="absolute right-4 top-4 flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Pencil
                      size={16}
                      className="text-gray-600 cursor-pointer hover:text-blue-500"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Enter First Name"
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Enter Last Name"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="email@gmail.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="admin">Role</Label>
                        <select
                          id="admin"
                          name="admin"
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Enter location"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Trash2
                      size={16}
                      className="text-red-600 cursor-pointer hover:text-red-800"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[420px] ">
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete this team member.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="flex justify-center items-center gap-4 w-full">
                        <DialogClose asChild>
                          <Button className="w-28" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          className="w-28"
                          variant="destructive"
                          onClick={() => {
                            console.log("Deleting member...");
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  <Users className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  {member.location && (
                    <p className="text-xs text-gray-400">{member.location}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="ml-2">{member.email}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="ml-2">{member.status}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Activity className="w-4 h-4 text-gray-600" />
                <span className="ml-2">{member.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Section_a;
