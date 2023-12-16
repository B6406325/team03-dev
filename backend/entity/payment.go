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

	PaymentStatusID *uint
	PaymentStatus   PaymentStatus `gorm:"references:id"`
}

type Package struct {
	gorm.Model
	PackageName    string `gorm:"uniqueIndex"`
	Price          float32
	PackageDetail  string
	DownloadStatus bool

	Payment   []Payment   `gorm:"foreignKey:PackageID"`
	Subscribe []Subscribe `gorm:"foreignKey:PackageID"`
}

type PaymentStatus struct {
	gorm.Model
	Status string `gorm:"uniqueIndex"`

	Payment []Payment `gorm:"foreignKey:PaymentStatusID"`
}
