import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ViewClient() {
    const clientobj=useSelector(state=>state.myobj.clientobj)
    const obj = useSelector((state) => state.myobj.obj);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        setClients(clientobj)
    }, [clientobj,obj]);
    
    

    return (
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
            <h2>Client List</h2><br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Email ID</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {clients.length > 0 ? (
                        clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.contactNo}</td>
                                <td>{client.emailId}</td>
                                
                              
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No clients available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}