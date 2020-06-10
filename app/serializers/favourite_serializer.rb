class FavouriteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :job_id

  belongs_to :user
end
