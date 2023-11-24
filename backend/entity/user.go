package entity

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserName string `gorm:"unique"`
	Email    string `gorm:"unique"`
	Password string `gorm:"unique"`

	StatusUserID *uint
	StatusUser   StatusUser `gorm:"references:id"`

	Payment     []Payment     `gorm:"foreignKey:UserID"`
	Report      []Report      `gorm:"foreignKey:UserID"`
	UserRating  []UserRating  `gorm:"foreignKey:UserID"`
	UserHistory []UserHistory `gorm:"foreignKey:UserID"`
	Download    []Download    `gorm:"foreignKey:UserID"`
	WatchList   []WatchList   `gorm:"foreignKey:UserID"`
}

type StatusUser struct {
	gorm.Model
	StatusName string
	User       []User `gorm:"foreignKey:StatusUserID"`
}
