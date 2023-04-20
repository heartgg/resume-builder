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
        if (user == null) router.push("/")
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
        return router.push("/admin")
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

    return (<div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">New Resume</h1>
            <form onSubmit={handleForm} className="form">
                <br />
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
                {projects.map((project, index) => (
                    <div key={index}>
                        <br />
                        <h2>Project {index+1}</h2>
                        <label htmlFor="name">
                            <p>Name</p>
                            <input onChange={(e) => {projects[index].name = e.target.value}} required type="text" name={"project-name"+index} id={"project-name"+index} placeholder="Project 1" />
                        </label>
                        <label htmlFor="description">
                            <p>Description</p>
                            <input onChange={(e) => {projects[index].description = e.target.value}} required type="text" name={"project-description"+index} id={"project-description"+index} placeholder="Tell us about the project" />
                        </label>
                        <label htmlFor="date">
                            <p>Date</p>
                            <input onChange={(e) => {projects[index].date = Timestamp.fromDate(new Date(e.target.value))}} required type="date" name={"project-date"+index} id={"project-date"+index} />
                        </label>
                        <br />
                    </div>
                ))}
                <br />
                <b onClick={() => addProject()}>Add Project</b>
                <br /><br />
                {experience.map((exp, index) => (
                    <div key={index}>
                        <br />
                        <h2>Experience {index+1}</h2>
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
                            <input onChange={(e) => {experience[index].description = e.target.value}} required type="text" name={"experience-description"+index} id={"experience-description"+index} placeholder="Tell us about the project" />
                        </label>
                        <label htmlFor="date">
                            <p>Date</p>
                            <input onChange={(e) => {experience[index].date = Timestamp.fromDate(new Date(e.target.value))}} required type="date" name={"experience-date"+index} id={"experience-date"+index} />
                        </label>
                        <br />
                    </div> 
                ))}
                <br />
                <b onClick={() => addExperience()}>Add Work Experience</b>
                <br /><br />
                <label htmlFor="skills">
                    <p>Skills</p>
                    <input onChange={(e) => setSkills(e.target.value)} required type="text" name="skills" id="skills" placeholder="Java, C++, Python" />
                </label>
                <br /><br />
                <button type="submit">Create Resume!</button>
            </form>
        </div>
    </div>);
}

export default Page;