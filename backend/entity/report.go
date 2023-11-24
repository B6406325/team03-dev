package entity

import "gorm.io/gorm"

type Report struct {
	gorm.Model
	Desricption string

	ReportTopicID *uint
	ReportTopic   ReportTopic `gorm:"references:id"`

	UserID *uint
	User   User `gorm:"references:id"`
}

type ReportTopic struct {
	gorm.Model
	TopicName string

	Report []Report `gorm:"foreignKey:ReportTopicID"`
}
