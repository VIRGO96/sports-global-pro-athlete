import Header from 'components/Headers/Header'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table, Card, CardBody } from 'reactstrap'
import { deleteFanRequest } from 'store/actions/fansActions'
import { getFans } from 'store/actions/fansActions'
import { getFansRequests, updateFanRequest } from 'store/actions/fansActions'

const data = [
    {
        name: 'John Deo',
        skype: "skype_john",
    },
    {
        name: 'John Deo',
        skype: "skype_john",
    },
    {
        name: 'John Deo',
        skype: "skype_john",
    },
    {
        name: 'John Deo',
        skype: "skype_john",
    },
    {
        name: 'John Deo',
        skype: "skype_john",
    },
]
function FansRequestingSkype() {
    let auth = useSelector(state => state.auth)
    let fan = useSelector(state => state.fan)
    let dispatch = useDispatch()
    const getFan = (id) => {
        if (id != undefined) {
            let obj = fan.fans.length > 0 && fan.fans.find(f => f.id == id)
            if (obj != null) {
                return obj
            } else {
                return "N/A"
            }
        } else {
            return "N/A"
        }
    }
    useEffect(() => {
        dispatch(getFans())
        dispatch(getFansRequests(auth.uid))
    }, [])
    return (
        <>
            <Header />
            <Container className="mt--4" fluid>
                <p className="text-dark auth-desc-subtitle ml-0">Fans Requesting Skype Call from Athlete</p>
                {
                    fan.requests.length == 0
                        ?
                        <Card className="filter-card mt-5">
                            <CardBody className="bg-danger text-center rounded">
                                <h2 className="text-white">
                                    <i className="fa fa-exclamation-triangle mr-3"></i>  No Request Found.
                                </h2>
                            </CardBody>
                        </Card>
                        :
                        <Table className="align-items-center table-flush mt-3" responsive>
                            <thead>
                                <tr>
                                    <th scope="col" className="custom-table-heading custom-heading">Name</th>
                                    <th scope="col" className="custom-table-heading custom-heading text-center">Fan Skype ID</th>
                                    <th scope="col" className="custom-table-heading custom-heading text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="custom-table-body mt-3">
                                {fan.requests.length > 0 && fan.requests.map((d, idx) => (
                                    <tr>
                                        <td className={`custom-table-text ${idx == 0 ? "custom-table-body-top-left" : ""}`}>{getFan(d.fan_id).name}</td>
                                        <td className="custom-table-text" align="center">{d.fan_skype_id}</td>
                                        <td align="center" className={`custom-table-text ${idx == 0 ? "custom-table-body-top-right" : ""}`}>
                                            <span className={`pointer text-info ${d.status != "pending" && 'd-none'}`}
                                                onClick={e => {
                                                    e.preventDefault()
                                                    dispatch(updateFanRequest(d.id, 'completed'))
                                                }}
                                            >Mark as Done</span>
                                            <span className={`pointer text-success ${d.status != "completed" && "d-none"}`}
                                            >Completed</span>
                                            <i className="fa fa-trash pointer text-danger ml-3"
                                                onClick={e => {
                                                    e.preventDefault()
                                                    dispatch(deleteFanRequest(d.id))
                                                }}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                }
            </Container>
        </>
    )
}

export default FansRequestingSkype
