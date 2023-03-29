import React, { useState } from 'react'

export default function Form({ addItem, handleStateChange }) {
  const [formItem, setFormItem] = useState("")

  const handleNewStateChange = (e) => {
    setFormItem(e.target.value)
    handleStateChange(e.target.value)
  }



  return (
    <form className="form" onSubmit={(e) => {
      addItem(e, formItem)
      setFormItem("")
      }}>
        <input
          type="text"
          placeholder="Add Todo Item"
          onChange={handleNewStateChange}
          value={formItem}
        />
        <button type="submit">Add</button>
      </form>
  )
}
