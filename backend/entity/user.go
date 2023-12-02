package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string
	Email     string
	Password  string
	Firstname string
	Lastname  string
	Dob       time.Time

	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	PrefixID *uint
	Prefix   Prefix `gorm:"references:id"`

	SubscribeID *uint
	Subscribe   Subscribe `gorm:"references:id"`

	StatusUserID *uint
	StatusUser   StatusUser `gorm:"references:id"`

	Report    []Report    `gorm:"foreignKey:UserID"`
	Payment   []Payment   `gorm:"foreignKey:UserID"`
	Review    []Review    `gorm:"foreignKey:UserID"`
	History   []History   `gorm:"foreignKey:UserID"`
	Download  []Download  `gorm:"foreignKey:UserID"`
	Watchlist []Watchlist `gorm:"foreignKey:UserID"`
}

type Gender struct {
	gorm.Model
	Gender string

	User []User `gorm:"foreignKey:GenderID"`
}

type Prefix struct {
	gorm.Model
	Prefix string

	User []User `gorm:"foreignKey:PrefixID"`
}

type StatusUser struct {
	gorm.Model
	Status string

	User []User `gorm:"foreignKey:StatusUserID"`
}
