import React from 'react'

export default function Upload(props) {
    const handleChange = (e) =>
    {
        const file = e.target.files[0];
        if (file == undefined)
        return ;

        
        console.log(e.target.name);
        console.log(file.size);
        console.log(file.extension);
        if(file.extension )
        if((file.size)/1024 < 1024 )
        {
            props.onSuccess(file,e.target.name);
        }
        else props.onFail();
    }
    return (
        <div>
            <h1>Upload the following Documents ( Note : Documents should be in zip format)</h1>
            <div className="row">
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
            </div>


            <div className="row">
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
