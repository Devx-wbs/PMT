import { Pencil, Trash2, Mail, Clock, Activity, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
const teams = [
  {
    id: 1,
    title: "Frontend",
    lead: "Webblaze Softtech",
    initials: "F",
    members: ["Webblaze Softtech", "Kartikee Mehta"],
  },
  {
    id:2,
    title:"Frontend",
    lead:"Kartikee Mehta",
    initials:"F",
    members: ["Kartikee Mehta", "Webblaze Softtech"],
  },
];
const Section_a = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const handleCardClick = (team) => {
    setSelectedTeam(team);
  };
  const handleBack = () => {
    setSelectedTeam(null);
  };
  return (
    <div className="p-4 sm:p-6 md:p-10">
      {!selectedTeam ? (
        <div className="flex justify-between">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-blue-900">Teams</h2>
            <p className="text-gray-500 text-sm mb-6">Manage your teams and their members</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {teams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => handleCardClick(team)}
                  className="cursor-pointer bg-white rounded-2xl shadow p-4 flex items-center gap-4 w-full sm:w-1/2 hover:bg-gray-100 transition"
                >
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 font-bold flex items-center justify-center rounded-full text-xl">
                    {team.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{team.title}</h3>
                    <p className="text-gray-500 text-sm">Lead: {team.lead}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-900 text-white hover:bg-blue-800 h-fit mt-6">+ Add Team</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Team</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="teamName">Team Name</Label>
                    <Input id="teamName" name="teamName" placeholder="" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teamLead">Team Lead</Label>
                  <select
                    id="teamLead"
                    name="teamLead"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="select">Select</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teamLead">Team Members</Label>
                  <label class="space-x-2">
                    <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                    <span class="text-gray-800">Webblaze Softtech</span>
                  </label>
                  <label class="space-x-2">
                    <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                    <span class="text-gray-800">Kartikee Mehta</span>
                  </label>
                  <label class="space-x-2">
                    <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                    <span class="text-gray-800">Diptee Karmakar</span>
                  </label>
                  <label class="space-x-2">
                    <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                    <span class="text-gray-800">Kapil Badyal</span>
                  </label>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Team</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow p-6">
          <button
            onClick={handleBack}
            className=" text-black-400 text-sm mb-4"
          >
            ← Back to Teams
          </button>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-100 text-blue-700 font-bold flex items-center justify-center rounded-full text-3xl">
                {selectedTeam.initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{selectedTeam.title}</h1>
                <p className="text-gray-500">Lead: {selectedTeam.lead}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-transparent text-black px-4 py-2 hover:bg-gray-100">Edit Team</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Team</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="sm:flex-row gap-4">
                        <div className="flex-1">
                          <Label htmlFor="teamName">Team Name</Label>
                          <Input id="teamName" name="teamName" placeholder="" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="teamLead">Team Lead</Label>
                        <select
                          id="teamLead"
                          name="teamLead"
                          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="select">Select</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="teamLead">Team Members</Label>
                        <label class="space-x-2">
                          <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                          <span class="text-gray-800">Webblaze Softtech</span>
                        </label>
                        <label class="space-x-2">
                          <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                          <span class="text-gray-800">Kartikee Mehta</span>
                        </label>
                        <label class="space-x-2">
                          <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                          <span class="text-gray-800">Diptee Karmakar</span>
                        </label>
                        <label class="space-x-2">
                          <input type="checkbox" class="form-checkbox text-blue-600 h-4 w-4" />
                          <span class="text-gray-800">Kapil Badyal</span>
                        </label>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Add Team</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Button>
              <Button className="bg-red-500 text-white hover:bg-red-600">Delete Team</Button>
            </div>
          </div>
          <hr/>
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Team Members</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-gray-100 p-4 rounded-lg w-full sm:w-1/2">
                <h3 className="font-semibold mb-2">Team Lead</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 font-bold flex items-center justify-center rounded-full text-sm">
                    {selectedTeam.lead
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{selectedTeam.lead}</p>
                    <p className="text-sm text-gray-500">Team Lead</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg w-full sm:w-1/2">
                <h3 className="font-semibold mb-2">Team Members</h3>
                {selectedTeam.members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 text-blue-700 font-bold flex items-center justify-center rounded-full text-sm">
                      {member
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                    <p>{member}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Section_a;