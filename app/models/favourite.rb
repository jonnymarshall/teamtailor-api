class Favourite < ApplicationRecord
  belongs_to :user
  validates :job_id, presence: true
  validates_uniqueness_of :job_id, scope: :user_id
end
