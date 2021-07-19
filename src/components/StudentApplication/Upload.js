import React from 'react'

export default function Upload(props) {

    const handleImageChange = (e) =>{
        const file = e.target.files[0];
        console.log(file);
        if(file == undefined )
        return ;
        if(file.type != "image/jpeg")
        {
            alert("Please upload a JPG or JPEG image");
            return ;
        }
        if((file.size)/1024 < 300 )
        {
            props.onSuccess(file,e.target.name);
        }
        else alert("Image size cannot exceed 300kb")
        // else props.onFail();
    }

    const handleChange = (e) =>
    {
        const file = e.target.files[0];
        console.log(file);
        if (file == undefined)
        return ;
        console.log(e.target.name);
        console.log(file.size);
        console.log(file.extension);
        if(file.type != "application/x-zip-compressed" && file.type != "application/zip" && file.type != "application/x-zip")
        {
            alert("Please upload a valid file type");
            return ;
        }
        if((file.size)/1024 < 1024 )
        {
            props.onSuccess(file,e.target.name);
        }
        else props.onFail();
    }
    return (
        <div>
            <h1>Upload the following Documents ( Note : Documents should be in zip format, except image)</h1>
            <div className="row">
            <div className="col-md-4 p-5">
            <div className="row">
                <div className="form-group upload_form ">
                    <label>Applicant's Image</label> 
                    <span className="text-red">*</span> <input  name="image" type="file" placeholder="Upload Drawing 1"   className="form-control " onChange={(e)=>handleImageChange(e)}/>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row">
                <div className="form-group upload_form ">
                    <label>Mark Sheets/certificates(from class X to Highest degree obtained/appeared)(both sides) </label> 
                    <span className="text-red">*</span> <input  name="marksheets" type="file" placeholder="Upload Drawing 1"   className="form-control " onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row">
                <div className="form-group upload_form">
                    <label>GRE & TOEFL(if any)</label>
                    <input  name="GreAndToefl" type="file" placeholder="Upload Drawing 1"  className="form-control " onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row m-3">
                <div className="form-group upload_form">
                    <label>Certificate related to any fellowship (both sides)</label>
                    <input  name="fellowshipCertificate" type="file" placeholder="Upload Drawing 1"  className="form-control " onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row">
                <div className="form-group upload_form ">
                    <label>Professional experience certificate (if any)(both sides)</label>
                    <input  name="profExpCertificate" type="file" placeholder="Upload Drawing 1"  className="form-control " onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            </div>
            <div className="col-md-4 p-5">
            <div className="row">
                <div className="form-group upload_form">
                    <label>Passport (1 st and last page)</label>
                    <input  name="passportImage" type="file" placeholder="Upload Drawing 1"  className="form-control " onChange={(e)=>handleChange(e)}/>
                </div>
            </div>
            </div>
            
            </div>
            <hr/>
            
        </div>
    )
}
