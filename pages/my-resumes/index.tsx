'use client'
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { retrieveResumes } from "@/firebase/firestore/db_functions"
import IResume from "@/interfaces/resume";
import { Timestamp } from "firebase/firestore";

function Page() {
    // @ts-ignore
    const { user } = useAuthContext()
    const router = useRouter()
    const [resumes, setResumes] = useState([])
    const [currentResume, setCurrentResume] = useState<any>()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    useEffect(() => {
        retrieveResumes(user.uid).then(({result, error}) => {setResumes(result)})
    })

    const viewResume = (index) => {
        setCurrentResume(resumes[index])
        console.log(resumes[index])
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Resume ID</th>
                    <th>View</th>
                </tr>
                </thead>
                <tbody>
                    {resumes.map((resume, index) => 
                        (<tr key={index}>
                            <td>{resume.id}</td>
                            <td onClick={() => viewResume(index)}>View</td>
                        </tr>)
                    )}
                </tbody>
            </table>
            <br />
            {currentResume != null && 
                <div>
                    <h1>Resume {currentResume.id}</h1>
                    <br />
                    <b>{currentResume.name}</b>
                    <br />
                    <b>{currentResume.email}</b>
                    <br />
                    <b>{currentResume.phone_number}</b>
                    <br />
                    <br />
                    {
                        currentResume.projects.map((project, index) => (
                            <div key={index}>
                                <h1>Project {index}</h1>
                                <b>{new Date(project.date.seconds * 1000).toDateString()}</b>
                                <br />
                                <b>{project.description}</b>
                            </div>
                        ))
                    }
                    <br />
                    {
                        currentResume.experience.map((experience, index) => (
                            <div key={index}>
                                <h1>Experience {index}</h1>
                                <b>{experience.position}</b>
                                <br />
                                <b>{new Date(experience.date.seconds * 1000).toDateString()}</b>
                                <br />
                                <b>{experience.description}</b>
                            </div>
                        ))
                    }
                    <br />
                    <b>Skills: {currentResume.skills}</b>
                </div>
            }
        </div>
    );
}

export default Page;