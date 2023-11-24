package entity

import "gorm.io/gorm"

type Movie struct {
	gorm.Model
	MovieName   string `gorm:"unique"`
	Duration    string
	Description string
	Director    string
	Cast        string
	ImageUrl    string `gorm:"type:longtext"`
	VideoUrl    string

	CategoriesID *uint
	Categories   Categories `gorm:"references:id"`

	UserRating  []UserRating  `gorm:"foreignKey:MovieID"`
	UserHistory []UserHistory `gorm:"foreignKey:MovieID"`
	Download    []Download    `gorm:"foreignKey:MovieID"`
	WatchList   []WatchList   `gorm:"foreignKey:MovieID"`
}

type Categories struct {
	gorm.Model
	CategoriesName string
	Movie          []Movie `gorm:"foreignKey:CategoriesID"`
}
