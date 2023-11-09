'use client'

import { delete_employee_url, delete_organization_url } from "@/api_utils"
import { EditEmployeeModal } from "./EditEmployeeModal"
import { useState } from "react"
import { CreateOrganizationModal } from "./CreateOrganizationModal"
import { CreateProject } from "./CreateProject"
import Link from "next/link"
import { EditOrganizationModal } from "./EditOrganizationModal"
import { ConfirmActionModal } from "./ConfirmActionModal"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LoadingModal } from "./LoadingModal"
import { get_cookie } from "./helperFunctions/Cookies"
import axios_instance from "@/axiosInstance"

const OrganizationCard = ({organizationImage, name, numberOfEmployess, org_id }) => { 

    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    const [loadingDeleteOrganization, setLoadiDeleteOrganization] = useState(false)
    // const [loadingCreateProjwct, setLoadingCreateProject] = useState(false)


    const ToggleCreateProjectModal = (e) => {
        e.preventDefault();
        // alert("edit modal")
        setShowCreateProjectModal(!showCreateProjectModal)
    }

        // handles edit organization modal
    const ToggleEditOrganization = (e) => {
        e.preventDefault();
        setToggleEdit(!toggleEdit)
    }

     // handles delete organization modal
    const ToggleDeleteOrganization =  (e) => {
        e.preventDefault();
        setToggleDelete(!toggleDelete)
    }

    const handleDeleteOrganization = () => {

        let user_login_details = get_cookie("ovasite_user");
        if (user_login_details) {
            setLoadiDeleteOrganization(true)
            user_login_details = JSON.parse(user_login_details);

            const patch_url = `${delete_organization_url}`+ org_id
            const jwt = user_login_details.jwt
            console.log(patch_url + " => " + jwt);
        
            let config = {
            method: "delete",
            url: `${delete_organization_url}${org_id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_login_details.jwt}`,
            },
            data: JSON.stringify({
                name: name
                }),
            };
    
            axios_instance
            .request(config)
            .then((response) => {
               
            console.log(JSON.stringify(response.data));
            setLoadiDeleteOrganization(false)
            toast.success("Organization name deleted successfully!")
            console.log(JSON.stringify(response));
            setLoadiDeleteOrganization(false)
            setToggleDelete(!toggleDelete)
               
            })
            .catch((error) => {
                console.log(error);
                setLoadiDeleteOrganization(false)
                toast.error(`${error.response.data.error}`)
                // setToggleDelete(!toggleDelete)
            });
        }
    }

  return (
    //{/* <article className=" w-1/4 relative h-[27.7rem] p-4 border-[#ddd] border rounded-lg bg-ova_white"> */}
    <article className="w-[100%] mini:w-[48%] md:w-[48%] lg:w-[32%] md:h-[25.7rem] h-[18rem]  shadow-sm p-4 border-[#ddd] bg-white border rounded-lg hover:cursor-pointer">
        <Link href={`/organizations/${org_id}`}>
            
            {/* profile pics */}
            <div role="img" aria-label="Profile picture of Jane Doe" 
                className='mx-auto md:w-[12.5rem] md:h-[12.5rem] w-[6.25rem] h-[6.25rem]  
                rounded-full bg-[#cac0b3]'
                >
                {
                    organizationImage ? 
                        <img src={organizationImage} alt="Profile picture of Jane Doe" className="w-[12.5rem] h-[12.5rem]  rounded-full"/> 
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <path d="M60 30V40M60 40V50M60 40H70M60 40H50M43.3333 23.3333C43.3333 26.8696 41.9286 30.2609 39.4281 32.7614C36.9276 35.2619 33.5362 36.6667 30 36.6667C26.4638 36.6667 23.0724 35.2619 20.5719 32.7614C18.0714 30.2609 16.6667 26.8696 16.6667 23.3333C16.6667 19.7971 18.0714 16.4057 20.5719 13.9052C23.0724 11.4048 26.4638 10 30 10C33.5362 10 36.9276 11.4048 39.4281 13.9052C41.9286 16.4057 43.3333 19.7971 43.3333 23.3333ZM10 66.6667C10 61.3623 12.1071 56.2753 15.8579 52.5245C19.6086 48.7738 24.6957 46.6667 30 46.6667C35.3043 46.6667 40.3914 48.7738 44.1421 52.5245C47.8929 56.2753 50 61.3623 50 66.6667V70H10V66.6667Z" stroke="#C3C3C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                }
                
            </div>
            <h2 className="max-w-[80%] mx-auto mt-1 overflow-hidden 
                whitespace-nowrap text-ellipsis font-bold text-[1em] md:text-[1.25em] text-center">
                    {name}
            </h2>
            <h2 className="text-[1.25em] text-center overflow-wrap break-words">{numberOfEmployess}</h2>

            {/* edit and delete button */}
            <div className="flex flex-row justify-around mt-[1rem]">
                {/* edit button */}
                <button
                    aria-label="Edit button"
                    className="flex flex-row items-center outline-none  border-none"
                    onClick={ToggleEditOrganization}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                    >
                        <path
                        d="M14.6739 6.66666H8.00724C7.3 6.66666 6.62172 6.94761 6.12162 7.44771C5.62153 7.9478 5.34058 8.62608 5.34058 9.33333V24C5.34058 24.7072 5.62153 25.3855 6.12162 25.8856C6.62172 26.3857 7.3 26.6667 8.00724 26.6667H22.6739C23.3812 26.6667 24.0594 26.3857 24.5595 25.8856C25.0596 25.3855 25.3406 24.7072 25.3406 24V17.3333M23.4552 4.78133C23.7012 4.52663 23.9955 4.32348 24.3208 4.18372C24.6462 4.04396 24.9961 3.9704 25.3502 3.96732C25.7043 3.96425 26.0554 4.03172 26.3831 4.1658C26.7108 4.29988 27.0086 4.49789 27.259 4.74827C27.5093 4.99865 27.7074 5.29639 27.8414 5.62412C27.9755 5.95184 28.043 6.30298 28.0399 6.65706C28.0368 7.01114 27.9633 7.36106 27.8235 7.6864C27.6838 8.01175 27.4806 8.306 27.2259 8.55199L15.7779 20H12.0072V16.2293L23.4552 4.78133Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    <span className=" text-ova_grey">Edit</span>
                </button>

            {/* delete button */}
                <button
                aria-label="Delete button"
                className="flex flex-row items-center outline-none  border-none"
                onClick={ToggleDeleteOrganization}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                >
                    <g clipPath="url(#clip0_124_9141)">
                    <path
                        d="M26.674 6.66666C27.0276 6.66666 27.3668 6.80713 27.6168 7.05718C27.8668 7.30723 28.0073 7.64637 28.0073 7.99999C28.0073 8.35361 27.8668 8.69275 27.6168 8.9428C27.3668 9.19285 27.0276 9.33332 26.674 9.33332H25.3407L25.3367 9.42799L24.0927 26.856C24.0448 27.5288 23.7437 28.1584 23.2501 28.6181C22.7566 29.0778 22.1071 29.3333 21.4327 29.3333H10.5807C9.90618 29.3333 9.25675 29.0778 8.76317 28.6181C8.2696 28.1584 7.96855 27.5288 7.92066 26.856L6.67666 9.42932C6.67464 9.39736 6.67375 9.36534 6.67399 9.33332H5.34066C4.98704 9.33332 4.6479 9.19285 4.39785 8.9428C4.1478 8.69275 4.00732 8.35361 4.00732 7.99999C4.00732 7.64637 4.1478 7.30723 4.39785 7.05718C4.6479 6.80713 4.98704 6.66666 5.34066 6.66666H26.674ZM22.67 9.33332H9.34466L10.582 26.6667H21.4327L22.67 9.33332ZM18.674 2.66666C19.0276 2.66666 19.3668 2.80713 19.6168 3.05718C19.8668 3.30723 20.0073 3.64637 20.0073 3.99999C20.0073 4.35361 19.8668 4.69275 19.6168 4.9428C19.3668 5.19285 19.0276 5.33332 18.674 5.33332H13.3407C12.987 5.33332 12.6479 5.19285 12.3978 4.9428C12.1478 4.69275 12.0073 4.35361 12.0073 3.99999C12.0073 3.64637 12.1478 3.30723 12.3978 3.05718C12.6479 2.80713 12.987 2.66666 13.3407 2.66666H18.674Z"
                        fill="#FF595A"
                    />
                    </g>
                    <defs>
                    <clipPath id="clip0_124_9141">
                        <rect
                        width="32"
                        height="32"
                        fill="white"
                        transform="translate(0.00732422)"
                        />
                    </clipPath>
                    </defs>
                </svg>
                <span className=" text-ova_grey">Delete</span>
                </button>
            </div>

            <button
            onClick={ToggleCreateProjectModal}
                aria-label="Create Project"
                className=" w-[80%] mx-auto mt-[0.75rem] flex flex-row justify-center items-center md:gap-4 gap-2 bg-peach_primary py-[0.5rem] md:py-[1rem] px-1[rem] md:px-[1.25rem]  text-[1em] rounded-[0.5rem] text-ellipsis"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                >
                <path
                    d="M12.6666 8.66668H8.66659V12.6667H7.33325V8.66668H3.33325V7.33334H7.33325V3.33334H8.66659V7.33334H12.6666V8.66668Z"
                    fill="white"
                />
                </svg>
                <span className="text-ova_white text-[1em] ">
                    Add Project 
                </span>
            </button>

        </Link>
        {
            showCreateProjectModal ? <CreateProject 
            handleCancelBtn={ToggleCreateProjectModal}
            isCreateProjectActive={true}
            id={org_id}
            /> : null
        }

        {
          toggleEdit ? <EditOrganizationModal 
          handleCancelBtn={ToggleEditOrganization} isEditOrganizationModalActive={true} 
          handleCreateBtn={() => null} 
          org_id={org_id}
          /> : null
        }

        {toggleDelete ? 
            <ConfirmActionModal
            title={'Are you sure you want to Delete?'}
            description={'Once you choose to delete, the action is final and cannot be undone. Please take a moment to ensure that you truly wish to proceed with this irreversible step.'}
            isConfirmModalActive ={true} 
            url  
            handleCancelBtn={ToggleDeleteOrganization}
            handleConfirmBtn ={handleDeleteOrganization}
            loading={loadingDeleteOrganization}
            /> 
            : null
        }
         {
            loadingDeleteOrganization ? <LoadingModal/> : null
        }

        <ToastContainer/>

    </article>

  )
}

export default OrganizationCard