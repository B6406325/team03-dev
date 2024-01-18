package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)



type Payment struct {
	gorm.Model
	Datetime time.Time `valid:"required~Dob is required"`
	Bill string `valid:"required~bill is required,image_valid~รูปภาพไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่"`
	Adminname string `valid:"required~admin name is required,max=50~admin name must be at most 50 characters"`
	Adminkey uint `valid:"required~admin key is required,regexp=^64.{5}$~admin key must start with '64' followed by any 5 characters"`
	
	UserID *uint
	User   User `gorm:"references:id"`

	PackageID *uint
	Package   Package `gorm:"references:id"`

	PaymentStatusID *uint
	PaymentStatus   PaymentStatus `gorm:"references:id"`
}
func init() {
	
	govalidator.TagMap["image_valid"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^(data:image(.+);base64,.+)$")
	})
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
