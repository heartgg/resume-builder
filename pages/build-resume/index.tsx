'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createResume } from "@/firebase/firestore/db_functions";
import { Timestamp } from "firebase/firestore";
function Page() {
    // @ts-ignore
    const { user } = useAuthContext()
    const router = useRouter()

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [projects, setProjects] = React.useState([{
        name: '',
        description: '',
        date: null
    }])
    const [experience, setExperience] = React.useState([{
        name: '',
        position: '',
        description: '',
        date: null
    }])
    const [skills, setSkills] = React.useState('')

    React.useEffect(() => {
        if (user == null) router.push("/signin")
    }, [user])

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await createResume({
            uid: user.uid,
            name: name,
            email: email,
            phone_number: phoneNumber,
            projects: projects,
            experience: experience,
            skills: skills,
        });
        

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/my-resumes")
    }

    const addProject = () => {
        setProjects([...projects, {
            name: '',
            description: '',
            date: null
        }])
    }

    const addExperience = () => {
        setExperience([...experience, {
            name: '',
            position: '',
            description: '',
            date: null
        }])
    }

    return (<div className="wrapper flex items-center justify-center h-max min-h-screen from-green-300 to-teal-500 bg-gradient-to-r">
        <div className="form-wrapper w-1/2 bg-white p-12 m-12">
            <h1 className="text-3xl mb-2">New Resume</h1>
            <hr />
            <form onSubmit={handleForm} className="form">
                <div className="shadow-md p-2 mt-2 mb-2">
                    <h2 className="text-lg font-bold">Contact Info</h2>
                    <label htmlFor="name">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} required type="text" name="name" id="name" placeholder="Adam Szumski" />
                    </label>
                    <label htmlFor="email">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="phonenumber">
                        <p>Phone Number</p>
                        <input onChange={(e) => setPhoneNumber(e.target.value)} required type="text" name="phonenumber" id="phonenumber" placeholder="123-456-7890" />
                    </label>
                </div>
                {projects.map((project, index) => (
                    <div key={index} className="shadow-md p-2">
                        <h2 className="text-lg font-bold">Project {index+1}</h2>
                        <label htmlFor="name">
                            <p>Name</p>
                            <input onChange={(e) => {projects[index].name = e.target.value}} required type="text" name={"project-name"+index} id={"project-name"+index} placeholder="Project 1" />
                        </label>
                        <label htmlFor="description">
                            <p>Description</p>
                            <textarea className="w-full p-2 border-[1px] text-sm" onChange={(e) => {projects[index].description = e.target.value}} required name={"project-description"+index} id={"project-description"+index} placeholder="Tell us about the project" />
                        </label>
                        <label htmlFor="date">
                            <p>Date</p>
                            <input className="text-gray-400" onChange={(e) => {projects[index].date = Timestamp.fromDate(new Date(e.target.value))}} required type="date" name={"project-date"+index} id={"project-date"+index} />
                        </label>
                    </div>
                ))}
                <p className="p-2 shadow-md rounded-lg w-full hover:bg-opacity-100 hover:cursor-pointer mb-2 mt-2 text-center bg-green-100 bg-opacity-50" onClick={() => addProject()}>Add Project +</p>
                {experience.map((exp, index) => (
                    <div key={index} className="shadow-md p-2">
                            <h2 className="text-lg font-bold">Experience {index+1}</h2>
                        <label htmlFor="name">
                            <p>Name</p>
                            <input onChange={(e) => {experience[index].name = e.target.value}} required type="text" name={"experience-name"+index} id={"experience-name"+index} placeholder="Microsoft" />
                        </label>
                        <label htmlFor="name">
                            <p>Position</p>
                            <input onChange={(e) => {experience[index].position = e.target.value}} required type="text" name={"experience-name"+index} id={"experience-name"+index} placeholder="Software Dev" />
                        </label>
                        <label htmlFor="description">
                            <p>Description</p>
                            <textarea className="w-full p-2 border-[1px] text-sm" onChange={(e) => {experience[index].description = e.target.value}} required name={"experience-description"+index} id={"experience-description"+index} placeholder="Tell us about the project" />
                        </label>
                        <label htmlFor="date">
                            <p>Date</p>
                            <input className="text-gray-400" onChange={(e) => {experience[index].date = Timestamp.fromDate(new Date(e.target.value))}} required type="date" name={"experience-date"+index} id={"experience-date"+index} />
                        </label>
    
                    </div> 
                ))}
                <p className="p-2 shadow-md rounded-lg w-full hover:bg-opacity-100 hover:cursor-pointer mb-2 mt-2 text-center bg-green-100 bg-opacity-50" onClick={() => addExperience()}>Add Work Experience +</p>
                <div className="shadow-md p-2">
                    <label htmlFor="skills">
                        <p className="text-lg font-bold">Skills</p>
                        <textarea className="w-full p-2 border-[1px] text-sm" onChange={(e) => setSkills(e.target.value)} required name="skills" id="skills" placeholder="Java, C++, Python" />
                    </label>
                </div>
                <button className="p-2 shadow-md rounded-lg w-full hover:bg-opacity-100 hover:cursor-pointer mb-2 mt-2 text-center bg-green-300 bg-opacity-50" type="submit">Create Resume!</button>
            </form>
        </div>
    </div>);
}

export default Page;