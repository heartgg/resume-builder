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
        if (user == null) router.push("/signin")
    }, [user])

    useEffect(() => {
        if (user != null) {
            retrieveResumes(user.uid).then(({result, error}) => {setResumes(result)})
        }
        
    })

    const viewResume = (index) => {
        setCurrentResume(resumes[index])
        console.log(resumes[index])
    }

    return (
        <div className="h-max min-h-screen from-green-300 to-teal-500 bg-gradient-to-r p-12">
            <div className="w-full flex items-center justify-center mb-6">
                <div className="bg-white p-2 w-1/2 shadow-md">
                    <table className="w-full">
                        <thead className="w-full">
                        <tr>
                            <th>Resume ID</th>
                            <th>View</th>
                        </tr>
                        </thead>
                        <tbody className="w-full">
                            {resumes.map((resume, index) => 
                                (<tr key={index}>
                                    <td className="px-12 text-center">{resume.id}</td>
                                    <td className="px-12 text-center">
                                        <button className="p-2 shadow-md rounded-lg w-full hover:bg-slate-100 mb-2 mt-2" onClick={() => viewResume(index)}>View</button>
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>
            {currentResume != null && 
                <div className="w-full flex items-center justify-center">
                    <div className="bg-white p-12 w-1/2 shadow-md min-h-[1000px]">
                        <h1 className="text-sm text-center text-gray-400">Resume {currentResume.id}</h1>
                        <h1 className="text-3xl font-bold text-center">{currentResume.name}</h1>
                        <p className="text-center">{currentResume.email + " | " + currentResume.phone_number}</p>
                        <h2 className="text-lg font-bold">Projects</h2>
                        {
                            currentResume.projects.map((project, index) => (
                                <div key={index} className="my-2">
                                    <p className="w-full">
                                        <span className="float-right">{new Date(project.date.seconds * 1000).toDateString()}</span>
                                        <span className="float-left italic">{project.name}</span>
                                    </p>
                                    <br />
                                    <p>{project.description}</p>
                                </div>
                            ))
                        }
                        <h2 className="text-lg font-bold">Work Experience</h2>
                        {
                            currentResume.experience.map((experience, index) => (
                                <div key={index} className="my-2">
                                    <p className="w-full">
                                        <span className="float-right">{new Date(experience.date.seconds * 1000).toDateString()}</span>
                                        <span className="float-left italic">{experience.name + " -- " + experience.position}</span>
                                    </p>
                                    <br />
                                    <p>{experience.description}</p>
                                </div>
                            ))
                        }
                        <h2 className="text-lg font-bold">Skills</h2>
                        <p>{currentResume.skills}</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default Page;