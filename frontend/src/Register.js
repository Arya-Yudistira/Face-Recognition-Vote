import { Component } from "react";

export default class Eegister extends Component{
    constructor(){
        super()
        this.state = {
            nik: null,
            name: null,
            result_status: null
        }
        this.register = this.register.bind(this);
    }
    register(){
        var nik = this.state.nik
        var name = this.state.name
        fetch("http://127.0.0.1:5000/register?nik="+nik+"&name="+name)
        .then(res => res.text())
        .then((res)=>{
            this.setState({nik:nik,name:name,result_status:res})
        })
    }
    render(){
        return(
            <>
                {this.state.result_status !== "Done" ?
                <>
                <p className="row justify-content-center">Masukan NIK Anda</p>
                <div className="form-group row justify-content-center">
                    <input type="text" name="nik" className="form-control formInput" onChange={(e)=>{this.setState({nik:e.target.value})}}/>
                </div>
                <br />
                <p className="row justify-content-center">Masukan Nama Anda</p>
                <div className="form-group row justify-content-center">
                    <input type="text" name="name" className="form-control formInput" onChange={(e)=>{this.setState({name:e.target.value})}}/>
                </div>
                <div className='row justify-content-center'>
                    <img src="http://localhost:5000/video_feed" alt="Video" />
                </div>
                <br />
                <div className="form-group row justify-content-center">
                    <input type="submit" value="Register" onClick={()=>{this.register()}} className="btn btn-primary" />
                </div>
                </>
                :
                <div>
                    <div className="details">
                        Hello {this.state.name} !
                        <br />Registrasi Anda Sudah Selesai. Anda Boleh Melanjutkan ke Proses Login
                    </div>
                </div>
                }
            </>
        )
    }
}