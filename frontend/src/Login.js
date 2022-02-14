import { Component } from "react";

export default class Login extends Component{
    constructor(){
        super()
        this.state = {
            nik:null,
            name:null,
            logged_in: false
        }
        this.login = this.login.bind(this);
    }
    login(){
        fetch("http://127.0.0.1:5000/login")
        .then(res => res.json())
        .then((res)=>{
            this.setState({nik:res.nik,name:res.name,logged_in:true})
        })
    }
    render(){
        return(
            <>
            {this.state.logged_in === false ?
                <>
                    <div className='row justify-content-center'>
                        <img src="http://localhost:5000/video_feed" alt="Video"/>
                    </div>
                    <br/>
                    <div className="form-group row justify-content-center">
                        <input type="submit" value="Login" onClick={()=>{this.login()}} className="btn btn-primary" />
                    </div>
                </>
            :
            [this.state.name === "You are unknown first register your self" ? 
                <>
                    <div className='text-center details'>
                    Anda Belum Terdaftar di dalam database Silahkan mendaftar dengan menekan tobol dibawah
                        <br />
                        <br />
                        <a href='http://localhost:3000/Register'><button className='btn btn-primary row justify-content-center' onClick={()=>{this.setState({show:false})}}>Registrasi</button></a>
                        <br />
                        <br />
                    </div>
                </>
                :
                <>
                    <div className="details text-center">
                        <p>NIK:{this.state.nik}</p>
                        <p>Nama: {this.state.name}</p>
                        <p>Anda Berhasil Login Silahkan Menenkan Tombol Dibawah Untuk Melanjutkan</p>
                        <div className="form-group">
                            <br />
                            <a href='http://localhost:3000/Vote'><button className='btn btn-primary' onClick={()=>{this.setState({show:false})}}>Continue</button></a>
                            <br />
                        </div>  
                    </div>
                </> 
                ]
            }
            </>
        )
    }
}