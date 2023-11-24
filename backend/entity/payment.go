package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Amount   float32
	Datetime time.Time
	Bill     string

	UserID *uint
	User   User `gorm:"references:id"`

	PackageID *uint
	Package   Package `gorm:"references:id"`

	StatusSubID *uint
	StatusSub   StatusSub `gorm:"references:id"`
}

type Package struct {
	gorm.Model
	PackageName string
	Price       float32
	Duration    int

	Payment []Payment `gorm:"foreignKey:PackageID"`
}

type StatusSub struct {
	gorm.Model
	StatusName string

	Payment []Payment `gorm:"foreignKey:StatusSubID"`
}
