"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, MoreVertical, FileText, X, ChevronDown, Pencil, Trash2 } from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"
import TopNav from "@/components/layout/TopNav"
import "@/styles/sponsors.css"

// Country codes and flags mapping
const countryFlags: Record<string, string> = {
  "234": "ng", 
  "233": "gh", 
  "254": "ke", 
  "27": "za", 
  "256": "ug", 
  "255": "tz", 
  "251": "et", 
  "20": "eg", 
  "212": "ma", 
  "216": "tn", 
}

export default function SponsorsPage() {
  const userName = "John Doe" 

  const [view, setView] = useState<"list" | "create" | "edit">("list")
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    {
      id: 1,
      name: "Eze Chikezie Snr",
      relationship: "Father",
      email: "ezechikezie@gmail.com",
      phone: "07012345678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Eze Theresa",
      relationship: "Mother",
      email: "ezetheresa@gmail.com",
      phone: "07012345678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Eze Chikezie Jnr",
      relationship: "Brother",
      email: "ezechikieziejnr@gmail.com",
      phone: "07012345678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Eze Mary",
      relationship: "Sister",
      email: "ezemary@gmail.com",
      phone: "07012345678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Eze Chioma",
      relationship: "Sister",
      email: "ezechiom@gmail.com",
      phone: "07012345678",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [newSponsor, setNewSponsor] = useState<Partial<Sponsor>>({
    relationship: "",
  })

  // State for tracking which sponsor is being edited
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sponsorToDelete, setSponsorToDelete] = useState<Sponsor | null>(null)

  // State for dropdown menu
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  // State for country code
  const [countryCode, setCountryCode] = useState("234") 


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (openDropdownId !== null && !target.closest(".dropdown-container")) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdownId])

  const handleCreateSponsor = () => {
    if (newSponsor.name && newSponsor.email && newSponsor.phone && newSponsor.relationship) {
      setSponsors([
        ...sponsors,
        {
          id: sponsors.length + 1,
          name: newSponsor.name,
          relationship: newSponsor.relationship,
          email: newSponsor.email,
          phone: newSponsor.phone,
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ])
      setNewSponsor({
        relationship: "",
      })
      setView("list")
    }
  }

  const handleEditSponsor = () => {
    if (editingSponsor && newSponsor.name && newSponsor.email && newSponsor.phone && newSponsor.relationship) {
      setSponsors(
        sponsors.map((sponsor) =>
          sponsor.id === editingSponsor.id
            ? {
                ...sponsor,
                name: newSponsor.name!,
                email: newSponsor.email!,
                phone: newSponsor.phone!,
                relationship: newSponsor.relationship!,
              }
            : sponsor,
        ),
      )
      setNewSponsor({ relationship: "" })
      setEditingSponsor(null)
      setView("list")
    }
  }

  const startEditSponsor = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor)
    setNewSponsor({
      name: sponsor.name,
      email: sponsor.email,
      phone: sponsor.phone,
      relationship: sponsor.relationship,
    })
    setView("edit")
    setOpenDropdownId(null) // Close dropdown
  }

  const confirmDeleteSponsor = (sponsor: Sponsor) => {
    setSponsorToDelete(sponsor)
    setDeleteDialogOpen(true)
    setOpenDropdownId(null) // Close dropdown
  }

  const deleteSponsor = () => {
    if (sponsorToDelete) {
      setSponsors(sponsors.filter((sponsor) => sponsor.id !== sponsorToDelete.id))
      setDeleteDialogOpen(false)
      setSponsorToDelete(null)
    }
  }

  const toggleDropdown = (id: number, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewSponsor({ ...newSponsor, phone: value })

    // Extract country code from phone number
    if (value.startsWith("+")) {
      // If the user enters a plus sign, try to extract the country code
      const match = value.match(/^\+(\d{1,3})/)
      if (match && match[1]) {
        setCountryCode(match[1])
      }
    } else if (value.length >= 1 && value.length <= 3) {
      // If the user is typing the first few digits, assume it might be a country code
      setCountryCode(value)
    } else if (value.startsWith("0") && value.length >= 2) {
      // For numbers starting with 0, assume Nigerian format
      setCountryCode("234")
    }
  }

  return (
    <div className="page-container">
      {/* Use the existing Sidebar component */}
      <Sidebar />

      <div className="content-wrapper">
        {/* Pass the required userName prop to TopNav */}
        <TopNav userName={userName} />

        {/* Content */}
        <main className="main-content">
          {view === "list" ? (
            <div className="sponsors-list-container">
              <div className="sponsors-header">
                <div className="sponsors-title-container">
                  <h1 className="sponsors-title">All sponsors</h1>
                  <span className="sponsors-count">{sponsors.length}</span>
                </div>

                <div className="sponsors-actions">
                  <div className="search-container">
                    <Search className="search-icon" />
                    <input type="text" placeholder="Search" className="search-input" />
                  </div>

                  <button onClick={() => setView("create")} className="create-button">
                    Create new sponsor
                  </button>
                </div>
              </div>

              {sponsors.length > 0 ? (
                <div className="table-container">
                  <table className="sponsors-table">
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Name of sponsor</th>
                        <th>Relationship</th>
                        <th>Email address</th>
                        <th>Phone number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sponsors.map((sponsor) => (
                        <tr key={sponsor.id}>
                          <td>{sponsor.id}</td>
                          <td>
                            <div className="sponsor-name-cell">
                              <div className="sponsor-avatar">
                                <img src={sponsor.avatar || "/placeholder.svg"} alt={sponsor.name} />
                              </div>
                              <span>{sponsor.name}</span>
                            </div>
                          </td>
                          <td>{sponsor.relationship}</td>
                          <td>{sponsor.email}</td>
                          <td>{sponsor.phone}</td>
                          <td>
                            <div className="dropdown-container">
                              <button className="action-button" onClick={(e) => toggleDropdown(sponsor.id, e)}>
                                <MoreVertical size={18} />
                              </button>

                              {openDropdownId === sponsor.id && (
                                <div className="dropdown-menu">
                                  <button className="dropdown-item" onClick={() => startEditSponsor(sponsor)}>
                                    <Pencil size={14} />
                                    <span>Edit sponsors details</span>
                                  </button>
                                  <button
                                    className="dropdown-item delete"
                                    onClick={() => confirmDeleteSponsor(sponsor)}
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete sponsor</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FileText className="file-icon" />
                  </div>
                  <p className="empty-text">No sponsors added yet. Add sponsors to get started</p>
                </div>
              )}
            </div>
          ) : (
            <div className="sponsor-form-container">
              <h1 className="form-title">{view === "create" ? "Create a sponsor" : "Edit sponsor details"}</h1>

              <div className="form-fields">
                <div className="form-field">
                  <label className="field-label">
                    Sponsor's name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter sponsor's name"
                    className="text-input"
                    value={newSponsor.name || ""}
                    onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    Sponsor's email address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter sponsor's email address"
                    className="text-input"
                    value={newSponsor.email || ""}
                    onChange={(e) => setNewSponsor({ ...newSponsor, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    Sponsor's phone number <span className="required">*</span>
                  </label>
                  <div className="phone-input-container">
                    <div className="country-code">
                      <div className={`flag-icon flag-icon-${countryFlags[countryCode] || "ng"}`}></div>
                      <span className="plus-sign">+</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="0901 234 5678"
                      className="phone-input"
                      value={newSponsor.phone || ""}
                      onChange={handlePhoneChange}
                    />
                    {newSponsor.phone && (
                      <button className="clear-button" onClick={() => setNewSponsor({ ...newSponsor, phone: "" })}>
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label className="field-label">
                    Relationship <span className="required">*</span>
                  </label>
                  <div className="select-container">
                    <select
                      className="select-input"
                      value={newSponsor.relationship || ""}
                      onChange={(e) => setNewSponsor({ ...newSponsor, relationship: e.target.value })}
                    >
                      <option value="" disabled>
                        Click to select relationship
                      </option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="select-arrow" />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  onClick={() => {
                    setView("list")
                    setNewSponsor({ relationship: "" })
                    setEditingSponsor(null)
                  }}
                  className="discard-button"
                >
                  Discard
                </button>
                <button onClick={view === "create" ? handleCreateSponsor : handleEditSponsor} className="submit-button">
                  {view === "create" ? "Done" : "Save changes"}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Custom Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="modal-overlay">
          <div className="delete-modal-container">
            <div className="delete-icon-container">
              <Trash2 className="delete-icon" />
            </div>

            <h3 className="delete-modal-title">Delete sponsor</h3>

            <p className="delete-modal-text">
              Are you sure you want to delete this sponsor?
              <br />
              This action is irreversible.
            </p>

            <div className="delete-modal-divider"></div>

            <div className="delete-modal-actions">
              <button onClick={() => setDeleteDialogOpen(false)} className="delete-cancel-button">
                Discard
              </button>
              <button onClick={deleteSponsor} className="delete-confirm-button">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface Sponsor {
  id: number
  name: string
  relationship: string
  email: string
  phone: string
  avatar: string
}