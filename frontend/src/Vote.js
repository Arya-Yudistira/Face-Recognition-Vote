import React, { Component } from "react";

export default class Vote extends Component{
    pilih(){
        fetch('http://127.0.0.1:5000/pilih')
    }
    pilih2(){
        fetch('http://127.0.0.1:5000/pilih2')
    }
    render(){
        return(
            <>
                <div className="row justify-content-center">
                    <h3>Pemilu Presiden 2069</h3>
                </div>
                <br />
                <div className="container-fluid row justify-content-center">
                    <div className="row">
                        <div className="col text-center px-md-6">
                            <img src="images/nurhadi.png" className="kandidat" alt="FOTO KANDIDAT" />
                        </div>
                        <div className="col text-center px-md-6">
                            <img src="images/nurhadi.png" className="kandidat" alt="FOTO KANDIDAT" />
                        </div>
                        <div class="w-100"></div>
                        <br />
                        <div class="col text-center px-md-6">
                            <a href='http://localhost:3000/'><input type="submit" value="Pilih" onClick={()=>{this.pilih()}} className="btn btn-primary" /></a>
                        </div>
                        <div class="col text-center px-md-6">
                            <a href='http://localhost:3000/'><input type="submit" value="Pilih" onClick={()=>{this.pilih2()}} className="btn btn-primary" /></a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}