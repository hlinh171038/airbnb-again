"use client"


interface ContainInformationProps {
    body: React.ReactElement
}
const ContainInformation:React.FC<ContainInformationProps> = ({
    body
}) =>{
    return (
        <div>
           {body}
        </div>
    )
}

export default ContainInformation