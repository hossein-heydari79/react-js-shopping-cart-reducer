import './App.css';
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Navbar } from './components/Navbar/Navbar'
import { Card } from './components/Card/Card'
import { Menubar } from './components/Menubar/Menubar'
import { Cardlist } from './components/Cardlist/Cardlist'
import { Pay } from './components/Pay/Pay'
import { Form } from './components/Form/Form'
import { Modals } from './components/Modals/Modals'
import data from './data/data.js'
import { useState, useEffect, useReducer } from 'react'


function filterReducer(filter, action) {
  switch (action.type) {
    case "ADD": {
      return (
        action.payload
      )
    }

    default:
      return filter
  }
}



function cardlistReducer(cardlist, action) {
  switch (action.type) {
    case "ADD_CARD_LIST": {
      return (
        action.payload
      )
    }

    default:
      return cardlist
  }
}



function modeReducer(mode, action) {
  switch (action.type) {
    case "TRUE": {
      return (
        action.payload
      )
    }

    default:
      return mode
  }
}


function showReducer(show, action) {
  switch (action.type) {
    case "TRUE_SHOW": {
      return (
        action.payload
      )
    }
    case "FALSE_SHOW":
      return action.payload

    default:
      return show
  }
}


function dataModalReducer(dataModal, action) {
  switch (action.type) {
    case "ADD_DATA_MODAL": {
      return (
        action.payload
      )
    }

    default:
      return dataModal
  }
}


function App() {

  const [json, setJson] = useState(data.sort((a, b) => a.price - b.price));


  const [filter, filterDispatch] = useReducer(filterReducer, {
    price: "lowest",
    size: "ALL"
  })

  const [cardlist, cardlistDispatch] = useReducer(cardlistReducer, [])

  const [mode, modeDispatch] = useReducer(modeReducer, {
    show: false
  })


  const [show, showDispatch] = useReducer(showReducer, {
    show: false
  })


  let showModal = () => {

    showDispatch({
      type: "TRUE_SHOW", payload: {
        show: true
      }
    })
  }

  let hideModal = () => {
    showDispatch({
      type: "FALSE_SHOW", payload: {
        show: false
      }
    })
  }


  const [dataModal, dataModalDispatch] = useReducer(dataModalReducer, {
    url: "",
    id: "",
    title: "",
    des: "",
    price: "",
    sizes: []
  })

  // const [dataModal, setDataModal] = useState({
  //   url: "",
  //   id: "",
  //   title: "",
  //   des: "",
  //   price: "",
  //   sizes: []
  // })



  useEffect(() => {

    let arr = [];

    label: for (let i = 0; i < data.length; i++) {
      for (let h = 0; h < data[i].size.length; h++) {
        if (data[i].size[h] === filter.size) {
          arr.push(data[i]);
          continue label;
        }
      }
    }


    if (filter.price === "lowest") {
      setJson(arr.sort((a, b) => a.price - b.price));
    }
    else {
      setJson(arr.sort((a, b) => b.price - a.price));
    }

  }, [filter])



  return (
    <>


      {
        show.show && < Modals show={showModal} hide={hideModal} datamodal={dataModal} cardlist={cardlist} cardlistDispatch={cardlistDispatch} />
      }

      <Header />

      <div className="main">
        <div className="left">

          <Navbar filter={filter} filterDispatch={filterDispatch} len={json.length} />
          <div className="card-section">
            {
              json.map((item, index) => (
                <Card key={item.id} id={item.id} url={item.url} description={item.description} price={item.price} cardlist={cardlist} cardlistDispatch={cardlistDispatch} show={showModal} hide={hideModal} datamodal={dataModal} dataModalDispatch={dataModalDispatch} />
              ))
            }
          </div>
        </div>

        <div className="right">
          <Menubar cardlist={cardlist} />
          {
            cardlist.map((item) => (
              <Cardlist key={item.id} id={item.id} url={item.url} description={item.description} price={item.price} count={item.count} cardlist={cardlist} cardlistDispatch={cardlistDispatch} />
            ))
          }
          {
            cardlist.length !== 0 && < Pay cardlist={cardlist} mode={mode} modeDispatch={modeDispatch} />
          }

          {
            cardlist.length !== 0 && mode.show && <Form />
          }


        </div>
      </div>



      <Footer />

    </>
  );
}

export default App;
