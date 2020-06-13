class ChangeJobIdFromStringToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :favourites, :job_id, 'integer USING CAST(job_id AS integer)'

  end
end
