
import Navbar from '../common/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from '../layout/Company/CompanyJobsTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useState , useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companyslice'

function Companies() {  
    const [input, setInput] = useState("");
    useGetAllCompanies();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

  
    return (
        <div>
            <Navbar />
            
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                     
                    />
                    <Button onClick={() => navigate("/recruiter/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies